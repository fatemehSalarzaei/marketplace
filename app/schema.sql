# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AccountsPhonecode(models.Model):
    phone_number = models.CharField(unique=True, max_length=11, blank=True, null=True)
    tmp_code = models.CharField(max_length=6)
    tmp_code_expire = models.DateTimeField()
    tmp_code_sent_time = models.DateTimeField()
    tmp_code_sent_counter_in_last_24_hour = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'Accounts_phonecode'


class AccountsRole(models.Model):
    name = models.CharField(unique=True, max_length=50)
    description = models.TextField()

    class Meta:
        managed = False
        db_table = 'Accounts_role'


class AccountsUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    email = models.CharField(unique=True, max_length=254)
    phone_number = models.CharField(unique=True, max_length=15)
    is_active = models.BooleanField()
    is_staff = models.BooleanField()
    date_joined = models.DateTimeField()
    role = models.ForeignKey(AccountsRole, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Accounts_user'


class AccountsUserGroups(models.Model):
    user = models.ForeignKey(AccountsUser, models.DO_NOTHING)
    group = models.ForeignKey('AuthGroup', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'Accounts_user_groups'
        unique_together = (('user', 'group'),)


class AccountsUserUserPermissions(models.Model):
    user = models.ForeignKey(AccountsUser, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'Accounts_user_user_permissions'
        unique_together = (('user', 'permission'),)


class AddressesAddress(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    street_address = models.CharField(max_length=255)
    postal_code = models.CharField(max_length=20)
    phone_number = models.CharField(max_length=15)
    is_default = models.BooleanField()
    created_at = models.DateTimeField()
    user = models.ForeignKey(AccountsUser, models.DO_NOTHING)
    city = models.ForeignKey('AddressesCity', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Addresses_address'


class AddressesCity(models.Model):
    name = models.CharField(max_length=100)
    province = models.ForeignKey('AddressesProvince', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'Addresses_city'
        unique_together = (('name', 'province'),)


class AddressesProvince(models.Model):
    name = models.CharField(unique=True, max_length=100)

    class Meta:
        managed = False
        db_table = 'Addresses_province'


class AttributesAttribute(models.Model):
    name = models.CharField(unique=True, max_length=100)
    slug = models.CharField(unique=True, max_length=100)

    class Meta:
        managed = False
        db_table = 'Attributes_attribute'


class AttributesAttributevalue(models.Model):
    value = models.CharField(max_length=100)
    attribute = models.ForeignKey(AttributesAttribute, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'Attributes_attributevalue'
        unique_together = (('attribute', 'value'),)


class AttributesProductvariantattribute(models.Model):
    attribute_value = models.ForeignKey(AttributesAttributevalue, models.DO_NOTHING)
    product_variant = models.ForeignKey('ProductsProductvariant', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'Attributes_productvariantattribute'
        unique_together = (('product_variant', 'attribute_value'),)


class BrandsBrand(models.Model):
    name = models.CharField(unique=True, max_length=100)
    slug = models.CharField(unique=True, max_length=120)
    logo = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    website = models.CharField(max_length=200, blank=True, null=True)
    is_active = models.BooleanField()
    created_at = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'Brands_brand'


class CartsCart(models.Model):
    session_id = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    is_active = models.BooleanField()
    discount_code = models.ForeignKey('DiscountsDiscountcode', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AccountsUser, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Carts_cart'


class CartsCartitem(models.Model):
    quantity = models.PositiveIntegerField()
    price_at_time = models.DecimalField(max_digits=10, decimal_places=5)  # max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    cart = models.ForeignKey(CartsCart, models.DO_NOTHING)
    product_variant = models.ForeignKey('ProductsProductvariant', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'Carts_cartitem'
        unique_together = (('cart', 'product_variant'),)


class CategoriesCategory(models.Model):
    name = models.CharField(max_length=100)
    slug = models.CharField(unique=True, max_length=120)
    description = models.TextField(blank=True, null=True)
    image = models.CharField(max_length=100, blank=True, null=True)
    icon = models.CharField(max_length=100, blank=True, null=True)
    is_active = models.BooleanField()
    meta_title = models.CharField(max_length=150, blank=True, null=True)
    meta_description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField()
    parent = models.ForeignKey('self', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Categories_category'


class CategoriesCategoryTags(models.Model):
    category = models.ForeignKey(CategoriesCategory, models.DO_NOTHING)
    tag = models.ForeignKey('TagsTag', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'Categories_category_tags'
        unique_together = (('category', 'tag'),)


class DiscountsDiscount(models.Model):
    title = models.CharField(max_length=255)
    discount_type = models.CharField(max_length=10)
    amount = models.DecimalField(max_digits=10, decimal_places=5)  # max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    start_date = models.DateTimeField(blank=True, null=True)
    end_date = models.DateTimeField(blank=True, null=True)
    is_active = models.BooleanField()

    class Meta:
        managed = False
        db_table = 'Discounts_discount'


class DiscountsDiscountCategories(models.Model):
    discount = models.ForeignKey(DiscountsDiscount, models.DO_NOTHING)
    category = models.ForeignKey(CategoriesCategory, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'Discounts_discount_categories'
        unique_together = (('discount', 'category'),)


class DiscountsDiscountProducts(models.Model):
    discount = models.ForeignKey(DiscountsDiscount, models.DO_NOTHING)
    product = models.ForeignKey('ProductsProduct', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'Discounts_discount_products'
        unique_together = (('discount', 'product'),)


class DiscountsDiscountVariants(models.Model):
    discount = models.ForeignKey(DiscountsDiscount, models.DO_NOTHING)
    productvariant = models.ForeignKey('ProductsProductvariant', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'Discounts_discount_variants'
        unique_together = (('discount', 'productvariant'),)


class DiscountsDiscountcode(models.Model):
    code = models.CharField(unique=True, max_length=50)
    usage_limit = models.PositiveIntegerField(blank=True, null=True)
    used_count = models.PositiveIntegerField()
    user_specific = models.BooleanField()
    min_order_total = models.DecimalField(max_digits=10, decimal_places=5, blank=True, null=True)  # max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    is_active = models.BooleanField()
    created_at = models.DateTimeField()
    discount = models.ForeignKey(DiscountsDiscount, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'Discounts_discountcode'


class DiscountsDiscountcodeAllowedUsers(models.Model):
    discountcode = models.ForeignKey(DiscountsDiscountcode, models.DO_NOTHING)
    user = models.ForeignKey(AccountsUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'Discounts_discountcode_allowed_users'
        unique_together = (('discountcode', 'user'),)


class FavoritesFavorite(models.Model):
    created_at = models.DateTimeField()
    product = models.ForeignKey('ProductsProduct', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AccountsUser, models.DO_NOTHING)
    variant = models.ForeignKey('ProductsProductvariant', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Favorites_favorite'
        unique_together = (('user', 'product'), ('user', 'variant'),)


class NotificationsNotification(models.Model):
    title = models.CharField(max_length=255)
    message = models.TextField()
    type = models.CharField(max_length=50)
    channel = models.CharField(max_length=10)
    is_read = models.BooleanField()
    created_at = models.DateTimeField()
    scheduled_at = models.DateTimeField(blank=True, null=True)
    user = models.ForeignKey(AccountsUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'Notifications_notification'


class OrdersOrder(models.Model):
    total_price = models.DecimalField(max_digits=10, decimal_places=5)  # max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    final_price = models.DecimalField(max_digits=10, decimal_places=5)  # max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    is_paid = models.BooleanField()
    created_at = models.DateTimeField()
    address = models.ForeignKey(AddressesAddress, models.DO_NOTHING, blank=True, null=True)
    coupon = models.ForeignKey(DiscountsDiscountcode, models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AccountsUser, models.DO_NOTHING)
    status = models.ForeignKey('OrdersOrderstatus', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Orders_order'


class OrdersOrderitem(models.Model):
    quantity = models.PositiveIntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=5)  # max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    total_price = models.DecimalField(max_digits=10, decimal_places=5)  # max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    order = models.ForeignKey(OrdersOrder, models.DO_NOTHING)
    variant = models.ForeignKey('ProductsProductvariant', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Orders_orderitem'


class OrdersOrderstatus(models.Model):
    code = models.CharField(unique=True, max_length=50)
    title = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'Orders_orderstatus'


class OrdersOrderstatushistory(models.Model):
    changed_at = models.DateTimeField()
    order = models.ForeignKey(OrdersOrder, models.DO_NOTHING)
    status = models.ForeignKey(OrdersOrderstatus, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'Orders_orderstatushistory'


class PaymentsInvoice(models.Model):
    order_id = models.CharField(unique=True, max_length=100)
    total_amount = models.DecimalField(max_digits=10, decimal_places=5)  # max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    created_at = models.DateTimeField()
    user = models.ForeignKey(AccountsUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'Payments_invoice'


class PaymentsPayment(models.Model):
    payment_method = models.CharField(max_length=20)
    status = models.CharField(max_length=20)
    amount = models.DecimalField(max_digits=10, decimal_places=5)  # max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    currency = models.CharField(max_length=10)
    transaction_id = models.CharField(unique=True, max_length=100, blank=True, null=True)
    payment_date = models.DateTimeField()
    refunded = models.BooleanField()
    refunded_date = models.DateTimeField(blank=True, null=True)
    refund_reason = models.TextField(blank=True, null=True)
    invoice = models.ForeignKey(PaymentsInvoice, models.DO_NOTHING)
    user = models.ForeignKey(AccountsUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'Payments_payment'


class ProductsProduct(models.Model):
    name = models.CharField(max_length=255)
    slug = models.CharField(unique=True, max_length=255)
    short_description = models.CharField(max_length=500)
    long_description = models.TextField()
    status = models.CharField(max_length=10)
    main_image = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    category = models.ForeignKey(CategoriesCategory, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'Products_product'


class ProductsProductAttributes(models.Model):
    product = models.ForeignKey(ProductsProduct, models.DO_NOTHING)
    attribute = models.ForeignKey(AttributesAttribute, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'Products_product_attributes'
        unique_together = (('product', 'attribute'),)


class ProductsProductgalleryimage(models.Model):
    image = models.CharField(max_length=100)
    alt_text = models.CharField(max_length=255)
    product = models.ForeignKey(ProductsProduct, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'Products_productgalleryimage'


class ProductsProductvariant(models.Model):
    sku = models.CharField(unique=True, max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=5)  # max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    stock = models.PositiveIntegerField()
    is_active = models.BooleanField()
    image = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    product = models.ForeignKey(ProductsProduct, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'Products_productvariant'


class ReviewsReview(models.Model):
    rating = models.PositiveSmallIntegerField()
    comment = models.TextField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    is_approved = models.BooleanField()
    parent = models.ForeignKey('self', models.DO_NOTHING, blank=True, null=True)
    product = models.ForeignKey(ProductsProduct, models.DO_NOTHING)
    user = models.ForeignKey(AccountsUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'Reviews_review'
        unique_together = (('product', 'user', 'parent'),)


class TagsTag(models.Model):
    name = models.CharField(unique=True, max_length=50)
    slug = models.CharField(unique=True, max_length=60)
    is_active = models.BooleanField()
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    category = models.ForeignKey('TagsTagcategory', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Tags_tag'


class TagsTagcategory(models.Model):
    name = models.CharField(unique=True, max_length=50)
    slug = models.CharField(unique=True, max_length=60)
    description = models.TextField(blank=True, null=True)
    is_active = models.BooleanField()

    class Meta:
        managed = False
        db_table = 'Tags_tagcategory'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)
    name = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class DjangoAdminLog(models.Model):
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AccountsUser, models.DO_NOTHING)
    action_time = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'
