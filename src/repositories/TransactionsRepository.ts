import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let outcome = 0;
    let income = 0;

    const total = this.transactions.reduce((totalValue, currentValue) => {
      if (currentValue.type === 'income') {
        income += currentValue.value;
        return totalValue + currentValue.value;
      }

      outcome += currentValue.value;
      return totalValue - currentValue.value;
    }, 0);

    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
