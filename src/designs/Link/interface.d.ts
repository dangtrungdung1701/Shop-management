export interface ILinkProps {
  /**
   * this is "name" of route which you want to direct
   * take all name route from @routes/index.js
   */
  to: string;
  /**
   * Query is a variable which you wanna assign for your url
   * @example { slug: "hello", page: 5} --> /home?slug=hello&page=5
   */
  params?: Record<string, string | undefined>;
  /**
   * shadow will make page don't have to refresh when change page
   * @note shadow should be disable when you want link to dynamic route
   */
  query?: Record<string, string | undefined>;
  /**
   * params is passed to dynamic route.
   * @example { slug: "home-in-city" } --> /product/home-in-city
   */
  disableShadow?: boolean;
  className?: string;
}
