"use client"

import TodoForm from "./components/TodoForm"
import TodoList from "./components/TodoList"
import { ConfirmDialog } from "primereact/confirmdialog"

export default function Page() {

  return (
    <main className="min-h-screen bg-zinc-900 flex justify-center p-10">

      <div className="w-full max-w-xl bg-zinc-800 rounded-xl p-6">

        <h1 className="text-4xl font-bold mb-6 text-center">
          Todo Application
        </h1>

        <ConfirmDialog />

        <TodoForm />

        <TodoList />

      </div>

    </main>
  )
}