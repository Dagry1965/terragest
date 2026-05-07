Write-Host "=== TERRAGEST_V2 - SETUP ERP BUSINESS TRANSACTION ENGINE ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force "src/core/transactions" | Out-Null

@'
export type TransactionStep = {
  name: string;

  execute: () => Promise<void>;
};

export type ERPTransaction = {
  id: string;

  module: string;

  action: string;

  steps: TransactionStep[];
};

const transactionHistory:
  ERPTransaction[] = [];

export async function executeTransaction(
  transaction: ERPTransaction
) {
  console.log(
    "ERP TRANSACTION START",
    transaction.action
  );

  for (const step of transaction.steps) {
    console.log(
      "ERP TRANSACTION STEP",
      step.name
    );

    await step.execute();
  }

  transactionHistory.unshift(
    transaction
  );

  console.log(
    "ERP TRANSACTION COMPLETED",
    transaction.action
  );
}

export function getTransactions() {
  return transactionHistory;
}
'@ | Set-Content "src/core/transactions/business-transaction-engine.ts"

Write-Host "=== ERP BUSINESS TRANSACTION ENGINE créé avec succès ===" -ForegroundColor Green