import { keysToSnakeCase } from "neetocist";
import { stringify } from "qs";
import { isEmpty, toPairs, omit, pipe } from "ramda";

/**
 * Constructs a URL by replacing dynamic route placeholders and appending
 * remaining parameters as query string values.
 *
 * Route placeholders follow the `:param` convention and are replaced with
 * corresponding values from the `params` object. Any parameters not used in
 * the route path are transformed into snake_case and appended as query
 * parameters.
 *
 * @param {string} route - Route pattern containing optional placeholders
 *                         (e.g., "/products/:slug").
 * @param {Object} params - Parameters used to populate route placeholders
 *                          and/or query string values.
 *
 * @returns {string} A fully constructed URL with path parameters substituted
 *                   and remaining parameters serialized as a query string.
 *
 * @example
 * buildUrl("/products/:slug", { slug: "macbook-air", pageNumber: 2 });
 *  → "/products/macbook-air?page_number=2"
 */
export const buildUrl = (route, params) => {
  const placeHolders = [];

  // Replace route placeholders with corresponding param values
  toPairs(params).forEach(([key, value]) => {
    if (route.includes(`:${key}`)) {
      placeHolders.push(key);
      route = route.replace(`:${key}`, encodeURIComponent(value));
    }
  });

  // Convert remaining params into snake_case query parameters
  const queryParams = pipe(
    omit(placeHolders),
    keysToSnakeCase,
    stringify
  )(params);

  // Append query string if present
  return isEmpty(queryParams) ? route : `${route}?${queryParams}`;
};
