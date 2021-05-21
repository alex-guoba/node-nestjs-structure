export interface Quote {
  text: string;
  author: string;
  tag: string;

  // For paraseq
  age?: number;
}

export interface InfQuote {
  status: number;
  message: string;
  count: number;
  quotes: Quote[];
}

export interface InfAge {
  name: string;
  age: number;
  count: number;
}

export interface InfQuoteAge {
  quote?: InfQuote;
  age?: InfAge;
}
