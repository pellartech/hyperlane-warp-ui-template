import type { GetServerSideProps } from 'next';

// Wallet UI is client-driven; skip static generation at build time to reduce CI memory.
export const forceSSR: GetServerSideProps = async () => ({ props: {} });
