import { deleteAvatar } from "@/services/user/profile/deleteAvatar";

export const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

export const API_ENDPOINTS = {
  home: `${API_BASE_URL}/home/`,
  refreshTokenUrl: `${API_BASE_URL}/token/refresh/`, 
  dashboard: `${API_BASE_URL}/accounts/dashboard/`,
  verifyOtp: `${API_BASE_URL}/accounts/auth/verify-code/`,
  logout: `${API_BASE_URL}/accounts/logout/`,
  getProfile: `${API_BASE_URL}/accounts/profile/`,
  updateProfile: `${API_BASE_URL}/accounts/profile/`,
  uploadAvatar: `${API_BASE_URL}/accounts/profile/avatar/`,
  deleteAvatar: `${API_BASE_URL}/accounts/profile/avatar/`,
  addresses: `${API_BASE_URL}/addresses/me/`,
  getCategoryProducts: (slug: string, page = 1) =>
    `${API_BASE_URL}/products/products/?category_slug=${slug}&page=${page}`,
  getProductById: (id: string) => `${API_BASE_URL}/products/products/${id}/`,
  cart: `${API_BASE_URL}/carts/cart/`,
  shipping: `${API_BASE_URL}/shipping/shipping-methods/`,
  createOrder: `${API_BASE_URL}/orders/create/`,
  getCategoryFilters: (slug: string) =>
    `${API_BASE_URL}/categories/categories/${slug}/filters/`,
  getFilteredProducts: `${API_BASE_URL}/products/products/`,
  getMyOrders: `${API_BASE_URL}/orders/my-orders/`,
  getOrderDetail: (id: string) =>
    `${API_BASE_URL}/orders/my-orders/${id}/detail/`,
  returnRequest: `${API_BASE_URL}/orders/return-request/`,
  favorites: `${API_BASE_URL}/favorites/favorites/`,
  add_to_favorites: `${API_BASE_URL}/favorites/favorites/add/`,
  remove_from_favorites: `${API_BASE_URL}/favorites/favorites/remove/`,
  check_favorite: "/favorites/check/",
  getReviews: `${API_BASE_URL}/reviews/reviews/`, 
  submitReview: `${API_BASE_URL}/reviews/reviews/create/`,
  userNotifications: `${API_BASE_URL}/notifications/user/notifications/`,
  myTickets: `${API_BASE_URL}/support/my-tickets/`,
  supportCategories: `${API_BASE_URL}/support/support-categories/`,  
  ticketMessages: `${API_BASE_URL}/support/ticket-messages/`,
recentViews: `${API_BASE_URL}/history/recent-views/`,

};

export const API_ENDPOINTS_ADMIN = {
  categories: `${API_BASE_URL}/categories/admin/categories/`,
  categories_all: `${API_BASE_URL}/categories/admin/categories-all/`,
  brands: `${API_BASE_URL}/brands/admin/brands/`,
  permissions: `${API_BASE_URL}/accounts/model-access-permissions/`,
  regularUsers: `${API_BASE_URL}/accounts/admin/regular-users/`,
  adminUsers: `${API_BASE_URL}/accounts/admin/admin-users/`,
  attributes: `${API_BASE_URL}/attributes/admin/attributes/`,
  attributes_all: `${API_BASE_URL}/attributes/admin/attributes-all/`,
  attributeGroups: `${API_BASE_URL}/attributes/admin/attribute-groups/`,
  attributeValues: `${API_BASE_URL}/attributes/admin/attribute-values/`,
  imageAssets: `${API_BASE_URL}/media/admin/images/`,
  videoAssets: `${API_BASE_URL}/media/admin/videos/`,  
  banners: `${API_BASE_URL}/banner/admin/banners/`,
  getFilteredProducts: `${API_BASE_URL}/products/admin/products/`,
  shipping_methods :  `${API_BASE_URL}/shipping/admin/shipping-methods/`,
  supportCategories :   `${API_BASE_URL}/support/admin/categories/`,
  tickets: `${API_BASE_URL}/support/admin/tickets/`,
  ticketMessages: `${API_BASE_URL}/support/admin/ticket-messages/`,
  product_attributes: `${API_BASE_URL}/attributes/admin/attributes/product-attributes/`,
  variant_attributes: `${API_BASE_URL}/attributes/admin/attributes/variant-attributes/`,
  orders : `${API_BASE_URL}/orders/admin/orders/`,
  product_save: `${API_BASE_URL}/products/admin/product/save-update/`,
  reviews: `${API_BASE_URL}/reviews/admin/reviews/`,
  change_order : `${API_BASE_URL}/orders/admin/update-order-status/`,
  returns_order : `${API_BASE_URL}/orders/admin/returns/`,
  payment_gateways : `${API_BASE_URL}/payments/admin/payment-gateways/`,
  notifications : `${API_BASE_URL}/notifications/admin/notifications/`,
  elements : `${API_BASE_URL}/page-builder/elements/`,
  elementitems : `${API_BASE_URL}/page-builder/elementitems/`,
  update_positions : `${API_BASE_URL}/page-builder/element/update-positions/`,
  elementtypes : `${API_BASE_URL}/page-builder/admin/elementtypes/`,


  
  
};
