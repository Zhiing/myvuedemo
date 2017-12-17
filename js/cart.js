var vm = new Vue({
    el: '#app',
    data: {
        totalMoney: 0,
        productList: [],
        checkAllFlag: false,
        delFlag: false,
        curPriduct: null
    },

    mounted: function () {
        this.$nextTick(function () {
            this.cartView()
        });
    },

    methods: {
        delConfirm: function (item) {
            this.delFlag = true;
            this.curPriduct = item;
        },

        delProduct: function () {
            var delIndex = this.productList.indexOf(this.curPriduct);
            this.productList.splice(delIndex, 1);
            this.delFlag = false;
        },

        cartView: function () {
            this.$http.get('data/cartData.json', {}).then(res => {
                this.productList = res.body.result.list;oney;
            });
        },

        changeMoney: function (product, way) {
            if (way) {
                product.productQuantity++;
            } else {
                product.productQuantity--;
                if (product.productQuantity < 1)
                    product.productQuantity = 1;
            }
            this.calcTotalPrice();
        },

        checkAll: function (flag) {
            if (this.checkAllFlag) {
                this.checkAllFlag = !this.checkAllFlag;
            } else {
                this.checkAllFlag = flag;
            }
            var _this = this;
            this.productList.forEach(function (item, index) {
                if (typeof item.checked == 'undefined') {
                    _this.$set(item, 'checked', _this.checkAllFlag);
                } else {
                    item.checked = _this.checkAllFlag;
                }
            });
            this.calcTotalPrice();
        },

        selectedProduct: function (item) {
            if (typeof item.checked == 'undefined') {
                this.$set(item, 'checked', true);
            } else {
                item.checked = !item.checked;
            }
            this.calcTotalPrice();
        },

        calcTotalPrice: function () {
            var _this = this;
            this.totalMoney = 0;
            this.productList.forEach(function (item, index) {
                if (item.checked) {
                    _this.totalMoney += item.productPrice * item.productQuantity;
                }
            });
        },

    },

    filters: {
        formatMoney: function (value, unit) {
            value = value || 0;
            unit = unit || '￥';
            if (unit === '$')
                return unit + ':' + (value / 7).toFixed(2);
            else
                return unit + ':' + value.toFixed(2);
        },
    },
});
