export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  category: string;
  publishedAt: number;
  authorId: string;
}

export const SAMPLE_POSTS: BlogPost[] = [
  {
    title: "How to Reduce Your Home Loan EMI by 20%",
    slug: "reduce-home-loan-emi",
    content: "## Strategies to reduce your home loan EMI\n\nWhen you take a home loan, the EMI can take a large chunk of your monthly income. Here are ways to mitigate it:\n\n1. **Prepayments:** Even small prepayments towards your principal can dramatically reduce your interest burden.\n2. **Home Loan Balance Transfer:** Keep an eye on interest rates and shift to a bank offering lower rates.\n3. **Increase your EMI annually:** As your salary grows, increase your EMI by 5% each year.",
    metaTitle: "How to Reduce Your Home Loan EMI by 20% | EMI Guides",
    metaDescription: "Learn actionable strategies to reduce your home loan EMI, from prepayments to balance transfers. Save thousands on interest.",
    focusKeyword: "reduce home loan emi",
    category: "Home Loans",
    publishedAt: Date.now() - 100000000,
    authorId: "admin"
  },
  {
    title: "Understanding the EMI Calculation Formula",
    slug: "emi-formula-explained",
    content: "## The Math Behind EMI\n\nThe formula for calculating EMI is `P x R x (1+R)^N / [(1+R)^N-1]`.\n\n*   **P** is Principal.\n*   **R** is monthly Interest Rate.\n*   **N** is number of months.\n\nIt might look complicated, but it's a simple amortization formula. Our tools do this math for you in real-time.",
    metaTitle: "EMI Formula Explained - How to Calculate EMI manually",
    metaDescription: "Understand the mathematical formula behind EMI calculation. Detailed explanation of principal, interest, and tenure math.",
    focusKeyword: "emi formula",
    category: "Financial Planning",
    publishedAt: Date.now() - 500000000,
    authorId: "admin"
  },
  {
    title: "Car Loan vs Personal Loan for Buying a Used Car",
    slug: "car-loan-vs-personal-loan-used-car",
    content: "## Which is better for a second-hand car?\n\nUsed car loans often have higher interest rates than new car loans. Sometimes, a personal loan might actually offer better terms if you have an excellent credit score.",
    metaTitle: "Car Loan vs Personal Loan - Used Car Buying Guide",
    metaDescription: "Comparing car loans and personal loans when buying a used vehicle. Find out which option gives you the lowest EMI.",
    focusKeyword: "car loan vs personal loan",
    category: "Car Loans",
    publishedAt: Date.now() - 200000000,
    authorId: "admin"
  }
];
