import { AnalyticsLineChart } from "@/components/ui/analytics-line-chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MeterBar } from "@/components/ui/meter-bar"

const hourlyIncome = [
  { label: "8AM", value: 60 },
  { label: "10AM", value: 120 },
  { label: "12PM", value: 260 },
  { label: "2PM", value: 220 },
  { label: "4PM", value: 340 },
]

const topByRevenue = [
  { name: "Cappuccino", value: 420, label: "$420" },
  { name: "Avocado Toast", value: 315, label: "$315" },
  { name: "Iced Matcha", value: 280, label: "$280" },
  { name: "Cold Brew", value: 240, label: "$240" },
  { name: "Flat White", value: 210, label: "$210" },
]

const maxRevenue = Math.max(1, ...topByRevenue.map((r) => r.value))

export function AnalyticsWidgetsExamplesCard() {
  return (
    <Card id="analytics-widgets" className="border shadow-sm">
      <CardHeader>
        <CardTitle className="text-base">Analytics widgets</CardTitle>
        <CardDescription>
          Standardized chart and ranking UI used by Activity reports.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Card className="border shadow-none bg-transparent">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Hourly income</CardTitle>
            <CardDescription>Line chart with tokenized styling</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <AnalyticsLineChart
              data={hourlyIncome}
              yTicks={[0, 100, 200, 300, 400]}
              valueFormatter={(v) => `$${v}`}
            />
          </CardContent>
        </Card>

        <Card className="border shadow-none bg-transparent">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Top items by revenue</CardTitle>
            <CardDescription>Meter rows (name + bar + value)</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {topByRevenue.map((row) => (
                <div
                  key={row.name}
                  className="grid grid-cols-[1fr_2fr_auto] items-center gap-3"
                >
                  <div className="truncate text-sm">{row.name}</div>
                  <MeterBar value={row.value} max={maxRevenue} aria-label={`${row.name} revenue`} />
                  <div className="text-sm tabular-nums">{row.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}

