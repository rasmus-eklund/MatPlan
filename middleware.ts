export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/menu', '/recipes', '/shoppingList', '/ingredients', '/stores'],
};
