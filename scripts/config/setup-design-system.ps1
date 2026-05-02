Write-Host "Generating Terragest Design System..." -ForegroundColor Cyan

# =====================================================
# UI DIRECTORY
# =====================================================

New-Item -ItemType Directory -Force -Path "src\components\ui"

# =====================================================
# BUTTON COMPONENT
# =====================================================

$button = @'
import React from "react";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {

  children: React.ReactNode;

  variant?: "primary" | "secondary";
}

export const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) => {

  const baseStyles =
    "px-4 py-3 rounded-xl font-medium transition-all";

  const variants = {

    primary:
      "bg-black text-white hover:bg-gray-800",

    secondary:
      "bg-gray-200 text-black hover:bg-gray-300",
  };

  return (

    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
'@

Set-Content `
"src\components\ui/Button.tsx" `
$button

# =====================================================
# CARD COMPONENT
# =====================================================

$card = @'
import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({
  children,
  className = "",
}: CardProps) => {

  return (

    <div
      className={`bg-white rounded-2xl shadow-md p-6 ${className}`}
    >
      {children}
    </div>
  );
};
'@

Set-Content `
"src\components\ui/Card.tsx" `
$card

# =====================================================
# INPUT COMPONENT
# =====================================================

$input = @'
import React from "react";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = ({
  className = "",
  ...props
}: InputProps) => {

  return (

    <input
      className={`w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-black ${className}`}
      {...props}
    />
  );
};
'@

Set-Content `
"src\components\ui/Input.tsx" `
$input

# =====================================================
# TABLE COMPONENT
# =====================================================

$table = @'
import React from "react";

interface TableProps {
  headers: string[];
  children: React.ReactNode;
}

export const Table = ({
  headers,
  children,
}: TableProps) => {

  return (

    <div className="bg-white rounded-2xl shadow-md overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            {headers.map((header) => (

              <th
                key={header}
                className="text-left p-4 font-semibold"
              >
                {header}
              </th>

            ))}

          </tr>

        </thead>

        <tbody>

          {children}

        </tbody>

      </table>

    </div>
  );
};
'@

Set-Content `
"src\components\ui/Table.tsx" `
$table

# =====================================================
# KPI CARD COMPONENT
# =====================================================

$kpiCard = @'
interface KPICardProps {

  title: string;

  value: number | string;
}

export const KPICard = ({
  title,
  value,
}: KPICardProps) => {

  return (

    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-gray-500">
        {title}
      </h2>

      <p className="text-4xl font-bold mt-2">
        {value}
      </p>

    </div>
  );
};
'@

Set-Content `
"src\components\ui/KPICard.tsx" `
$kpiCard

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest Design System generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated components:" -ForegroundColor Yellow
Write-Host "- Button"
Write-Host "- Card"
Write-Host "- Input"
Write-Host "- Table"
Write-Host "- KPICard"
Write-Host ""