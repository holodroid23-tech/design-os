import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'node:fs/promises'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'design-os:design-system-writer',
      configureServer(server) {
        const base = '/__design_os__/design-system'
        const allowed = new Set([
          'colors.json',
          'typography.json',
          'spacing.json',
          'radius.json',
          'elevations.json',
        ])

        server.middlewares.use(async (req, res, next) => {
          try {
            if (!req.url?.startsWith(base)) return next()

            const parts = req.url.split('?')[0].split('/')
            const fileName = parts[parts.length - 1]
            if (!fileName || !allowed.has(fileName)) {
              res.statusCode = 400
              res.setHeader('content-type', 'application/json')
              res.end(JSON.stringify({ ok: false, error: 'Invalid design system file' }))
              return
            }

            const filePath = path.resolve(__dirname, 'product', 'design-system', fileName)

            if (req.method === 'GET') {
              const content = await fs.readFile(filePath, 'utf8')
              res.statusCode = 200
              res.setHeader('content-type', 'application/json')
              res.end(content)
              return
            }

            if (req.method === 'PUT') {
              const chunks: Buffer[] = []
              await new Promise<void>((resolve, reject) => {
                req.on('data', (c) => chunks.push(Buffer.from(c)))
                req.on('end', () => resolve())
                req.on('error', (e) => reject(e))
              })

              const raw = Buffer.concat(chunks).toString('utf8')
              const parsed = JSON.parse(raw)
              const pretty = JSON.stringify(parsed, null, 2) + '\n'

              await fs.mkdir(path.dirname(filePath), { recursive: true })
              await fs.writeFile(filePath, pretty, 'utf8')

              // Ensure the client sees the new tokens immediately
              server.ws.send({ type: 'full-reload' })

              res.statusCode = 200
              res.setHeader('content-type', 'application/json')
              res.end(JSON.stringify({ ok: true }))
              return
            }

            res.statusCode = 405
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify({ ok: false, error: 'Method not allowed' }))
          } catch (err: any) {
            res.statusCode = 500
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify({ ok: false, error: err?.message ?? 'Server error' }))
          }
        })
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
})
