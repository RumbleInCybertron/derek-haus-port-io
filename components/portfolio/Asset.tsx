import { TransactionProps } from "@/components/portfolio/Transaction";

export type StockAssetProps = {
  id: string;
  transactions: TransactionProps[];
  shares: number;
  average: number;
};

export type CryptoAssetProps = {
  id: string;
  transactions: TransactionProps[];
  amount: number;
  average: number;
};