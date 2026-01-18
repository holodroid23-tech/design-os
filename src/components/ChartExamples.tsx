import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceArea,
} from 'recharts'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart } from 'lucide-react'
import { getSemanticColor } from '../lib/design-system-loader'

// Sample data for charts
const monthlySalesData = [
  { month: 'Jan', sales: 4000, expenses: 2400, profit: 1600 },
  { month: 'Feb', sales: 3000, expenses: 1398, profit: 1602 },
  { month: 'Mar', sales: 2000, expenses: 9800, profit: -7800 },
  { month: 'Apr', sales: 2780, expenses: 3908, profit: -1128 },
  { month: 'May', sales: 1890, expenses: 4800, profit: -2910 },
  { month: 'Jun', sales: 2390, expenses: 3800, profit: -1410 },
  { month: 'Jul', sales: 3490, expenses: 4300, profit: -810 },
]

const categoryData = [
  { name: 'Electronics', value: 400, color: '#3b82f6' },
  { name: 'Clothing', value: 300, color: '#10b981' },
  { name: 'Food', value: 200, color: '#f59e0b' },
  { name: 'Books', value: 100, color: '#8b5cf6' },
  { name: 'Other', value: 150, color: '#ec4899' },
]

const revenueData = [
  { name: 'Q1', revenue: 45000 },
  { name: 'Q2', revenue: 52000 },
  { name: 'Q3', revenue: 48000 },
  { name: 'Q4', revenue: 61000 },
]

const tableData = [
  { id: 1, product: 'Product A', category: 'Electronics', sales: 12500, units: 250, revenue: 31250 },
  { id: 2, product: 'Product B', category: 'Clothing', sales: 9800, units: 196, revenue: 24500 },
  { id: 3, product: 'Product C', category: 'Food', sales: 15200, units: 304, revenue: 38000 },
  { id: 4, product: 'Product D', category: 'Books', sales: 6700, units: 134, revenue: 16750 },
  { id: 5, product: 'Product E', category: 'Electronics', sales: 18900, units: 378, revenue: 47250 },
]

interface ChartExamplesProps {
  showHeader?: boolean
}

/**
 * Get tooltip styles from design tokens
 * Falls back to stone colors if design tokens are not available
 */
function getTooltipStyles() {
  // Always use white background for readability, regardless of design tokens
  const backgroundColor = '#ffffff' // white
  const color = '#1c1917' // stone-900 (dark text for white background)
  const border = '1px solid #e7e5e4' // stone-300 (light border for white background)

  return {
    backgroundColor,
    color,
    border,
    borderRadius: '8px',
    fontSize: '12px',
    padding: '8px 12px',
    boxShadow: 'var(--shadow-md)',
  }
}

/**
 * Get active dot (hover) color from design tokens
 * Uses a subtle secondary color instead of aggressive white
 */
function getActiveDotColor() {
  // Try to get secondary color from design tokens
  const onLayerSecondary = getSemanticColor('onLayer', 'secondary') // Neutral grayish secondary
  const linkSecondary = getSemanticColor('link', 'secondary')

  // Prefer onLayer.secondary (neutral gray) for less aggressive hover, fallback to link.secondary
  return onLayerSecondary || linkSecondary || '#b5b5b7' // Neutral gray as final fallback
}

/**
 * Get hover background highlight color from design tokens
 * Uses subtle black color (border.secondary) for background highlight
 */
function getHoverBackgroundColor() {
  // Try to get border.secondary (subtle black) from design tokens
  const borderSecondary = getSemanticColor('border', 'secondary') // rgba(0,0,0,0.1)
  const onLayerSecondary = getSemanticColor('onLayer', 'secondary') // #b5b5b7

  // Prefer border.secondary (subtle black), fallback to onLayer.secondary
  return borderSecondary || onLayerSecondary || 'rgba(0,0,0,0.1)' // Subtle black as final fallback
}

// Bar Chart with Hover Background Highlight
function BarChartWithHover() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const hoverBgColor = getHoverBackgroundColor()

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Bar Chart - Quarterly Revenue
        </CardTitle>
        <CardDescription>Compare revenue across quarters</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-x-auto">
          <ResponsiveContainer width="100%" height={300} minHeight={250}>
            <BarChart
              data={revenueData}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-stone-200 dark:stroke-stone-700" />
              <XAxis
                dataKey="name"
                className="text-muted-foreground text-xs sm:text-sm"
                tick={{ fill: 'currentColor', fontSize: 12 }}
                tickMargin={8}
              />
              <YAxis
                className="text-muted-foreground text-xs sm:text-sm"
                tick={{ fill: 'currentColor', fontSize: 12 }}
                tickMargin={8}
                width={60}
              />
              <Tooltip
                contentStyle={getTooltipStyles()}
              />
              {hoveredIndex !== null && revenueData[hoveredIndex] && (
                <ReferenceArea
                  x1={revenueData[hoveredIndex].name}
                  x2={revenueData[hoveredIndex].name}
                  fill={hoverBgColor}
                  fillOpacity={1}
                />
              )}
              <Bar
                dataKey="revenue"
                fill="#148134"
                name="Revenue ($)"
                radius={[4, 4, 0, 0]}
              >
                {revenueData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill="#148134"
                    onMouseEnter={() => setHoveredIndex(index)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

// Value Widget Component
function ValueWidget({
  title,
  value,
  dateRange,
  change,
  changeType,
  icon: Icon
}: {
  title: string
  value: string
  dateRange?: string
  change: string
  changeType: 'up' | 'down'
  icon: React.ElementType
}) {
  return (
    <Card className="border">
      <CardContent className="p-2 sm:p-3">
        <div className="flex flex-col items-center text-center space-y-2">
          {/* Icon first */}
          <div className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800">
            <Icon className="h-6 w-6 text-muted-foreground" />
          </div>

          {/* Metric (title) */}
          <p className="text-sm text-muted-foreground">{title}</p>

          {/* Date range */}
          {dateRange && (
            <p className="text-xs text-muted-foreground">{dateRange}</p>
          )}

          {/* Value */}
          <p className="text-2xl font-bold text-foreground">{value}</p>

          {/* Trend */}
          <div className="flex items-center justify-center gap-1">
            {changeType === 'up' ? (
              <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
            )}
            <span className={`text-sm font-medium ${changeType === 'up'
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-600 dark:text-red-400'
              }`}>
              {change}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function ChartExamples({ showHeader = true }: ChartExamplesProps) {
  return (
    <div className="space-y-6">
      {showHeader && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Chart Examples
          </h2>
          <p className="text-muted-foreground">
            Mobile-optimized charts using Recharts library. All charts are responsive and touch-friendly.
          </p>
        </div>
      )}

      {/* Value Widgets */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Value Widgets (Metric Cards)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ValueWidget
            title="Total Revenue"
            value="$45,231"
            dateRange="Last 30 days"
            change="+20.1%"
            changeType="up"
            icon={DollarSign}
          />
          <ValueWidget
            title="Active Users"
            value="2,350"
            dateRange="Last 30 days"
            change="+180.1%"
            changeType="up"
            icon={Users}
          />
          <ValueWidget
            title="Total Sales"
            value="12,234"
            dateRange="Last 30 days"
            change="-5.2%"
            changeType="down"
            icon={ShoppingCart}
          />
        </div>
      </div>

      {/* Line Chart - Mobile Optimized */}
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Line Chart - Monthly Sales Trend
          </CardTitle>
          <CardDescription>Track sales and expenses over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-x-auto">
            <ResponsiveContainer width="100%" height={300} minHeight={250}>
              <LineChart
                data={monthlySalesData}
                margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-stone-200 dark:stroke-stone-700" />
                <XAxis
                  dataKey="month"
                  className="text-muted-foreground text-xs sm:text-sm"
                  tick={{ fill: 'currentColor', fontSize: 12 }}
                  tickMargin={8}
                />
                <YAxis
                  className="text-muted-foreground text-xs sm:text-sm"
                  tick={{ fill: 'currentColor', fontSize: 12 }}
                  tickMargin={8}
                  width={60}
                />
                <Tooltip
                  contentStyle={getTooltipStyles()}
                />
                <Legend
                  wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                  iconSize={12}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#148134"
                  strokeWidth={2}
                  name="Sales"
                  dot={{ r: 4 }}
                  activeDot={{ r: 6, fill: getActiveDotColor(), stroke: '#148134', strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#ef4444"
                  strokeWidth={2}
                  name="Expenses"
                  dot={{ r: 4 }}
                  activeDot={{ r: 6, fill: getActiveDotColor(), stroke: '#ef4444', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Bar Chart - Mobile Optimized */}
      <BarChartWithHover />

      {/* Horizontal Bar Chart */}
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Horizontal Bar Chart - Sales by Category
          </CardTitle>
          <CardDescription>Category performance comparison</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-x-auto">
            <ResponsiveContainer width="100%" height={300} minHeight={250}>
              <BarChart
                layout="vertical"
                data={categoryData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-stone-200 dark:stroke-stone-700" />
                <XAxis type="number" className="text-muted-foreground text-xs sm:text-sm" />
                <YAxis
                  dataKey="name"
                  type="category"
                  className="text-muted-foreground text-xs sm:text-sm"
                  width={80}
                />
                <Tooltip
                  contentStyle={getTooltipStyles()}
                />
                <Bar dataKey="value" fill="#148134" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Area Chart - Mobile Optimized */}
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Area Chart - Profit Over Time
          </CardTitle>
          <CardDescription>Visualize profit trends with filled area</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-x-auto">
            <ResponsiveContainer width="100%" height={300} minHeight={250}>
              <AreaChart
                data={monthlySalesData}
                margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#148134" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#148134" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-stone-200 dark:stroke-stone-700" />
                <XAxis
                  dataKey="month"
                  className="text-muted-foreground text-xs sm:text-sm"
                  tick={{ fill: 'currentColor', fontSize: 12 }}
                  tickMargin={8}
                />
                <YAxis
                  className="text-muted-foreground text-xs sm:text-sm"
                  tick={{ fill: 'currentColor', fontSize: 12 }}
                  tickMargin={8}
                  width={60}
                />
                <Tooltip
                  contentStyle={getTooltipStyles()}
                />
                <Area
                  type="monotone"
                  dataKey="profit"
                  stroke="#148134"
                  fillOpacity={1}
                  fill="url(#colorProfit)"
                  name="Profit"
                  dot={{ r: 4 }}
                  activeDot={{ r: 6, fill: getActiveDotColor(), stroke: '#148134', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Pie Chart - Mobile Optimized */}
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Pie Chart - Sales by Category
          </CardTitle>
          <CardDescription>Category distribution visualization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-x-auto">
            <ResponsiveContainer width="100%" height={300} minHeight={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(props) => {
                    const name = props?.name ?? ''
                    const percent = props?.percent ?? 0
                    return `${String(name)} ${(percent * 100).toFixed(0)}%`
                  }}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  fontSize={11}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={getTooltipStyles()}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Legend for mobile */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
            {categoryData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-muted-foreground truncate">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Combined Chart - Mobile Optimized */}
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Combined Chart - Sales vs Expenses
          </CardTitle>
          <CardDescription>Compare multiple metrics side by side</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-x-auto">
            <ResponsiveContainer width="100%" height={300} minHeight={250}>
              <BarChart
                data={monthlySalesData}
                margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-stone-200 dark:stroke-stone-700" />
                <XAxis
                  dataKey="month"
                  className="text-muted-foreground text-xs sm:text-sm"
                  tick={{ fill: 'currentColor', fontSize: 12 }}
                  tickMargin={8}
                />
                <YAxis
                  className="text-muted-foreground text-xs sm:text-sm"
                  tick={{ fill: 'currentColor', fontSize: 12 }}
                  tickMargin={8}
                  width={60}
                />
                <Tooltip
                  contentStyle={getTooltipStyles()}
                />
                <Legend
                  wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                  iconSize={12}
                />
                <Bar
                  dataKey="sales"
                  fill="#148134"
                  name="Sales"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="expenses"
                  fill="#ef4444"
                  name="Expenses"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground">
            Data Table - Product Sales
          </CardTitle>
          <CardDescription>Sortable and responsive data table</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[100px]">Product</TableHead>
                  <TableHead className="min-w-[120px]">Category</TableHead>
                  <TableHead className="text-right min-w-[100px]">Sales</TableHead>
                  <TableHead className="text-right min-w-[100px]">Units</TableHead>
                  <TableHead className="text-right min-w-[120px]">Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-medium">{row.product}</TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell className="text-right">${row.sales.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{row.units.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-medium">
                      ${row.revenue.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>


      {/* Mobile Optimization Notes */}
      <Card className="border shadow-sm bg-stone-50 dark:bg-stone-900">
        <CardContent className="pt-6">
          <h3 className="text-sm font-semibold text-foreground mb-2">
            Mobile Optimization Features
          </h3>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
            <li>Responsive container that adapts to screen size</li>
            <li>Touch-friendly tooltips and interactions</li>
            <li>Optimized font sizes for mobile readability</li>
            <li>Horizontal scrolling for wide charts on small screens</li>
            <li>Minimum height constraints to prevent squishing</li>
            <li>Legend displayed below charts on mobile for better UX</li>
            <li>Tables with horizontal scroll on mobile</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
