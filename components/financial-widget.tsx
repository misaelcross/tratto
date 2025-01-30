import { ArrowDownIcon, ArrowUpIcon, ClockIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FinancialWidgetProps {
  title: string
  amount: string
  type: "expense" | "income" | "recent-expense" | "recent-income"
}

export function FinancialWidget({ title, amount, type }: FinancialWidgetProps) {
  const isExpense = type.includes("expense")
  const isRecent = type.includes("recent")

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        {isRecent ? (
          <ClockIcon className="h-4 w-4 text-muted-foreground" />
        ) : isExpense ? (
          <ArrowDownIcon className="h-4 w-4 text-red-500" />
        ) : (
          <ArrowUpIcon className="h-4 w-4 text-green-500" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {amount}
        </div>
      </CardContent>
    </Card>
  )
}
