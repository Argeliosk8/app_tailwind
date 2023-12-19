import React from "react";
import { Submit } from "../components/Submit.js";

export const SignUp = ()=> {
  return(
    <>
      <header className="bg-white shadow">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Enter your information</h1>
            </div>
      </header>
      <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8"><Submit /></div>
      </main>
      </>
  )
}