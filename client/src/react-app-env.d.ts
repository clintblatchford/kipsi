/// <reference types="react-scripts" />

export type Project = {
  name: string
  expenses: Expense[]
  id: string
  metadata: string
}

export type Expense = {
  name: string
  amount: number
  timestamp: Date
}