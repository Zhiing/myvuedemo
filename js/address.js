var vm = new Vue({
    el: '.container',
    data: {
        delFlag: false,
        editFlag: false,
        currentIndex: 0,
        limitNum: 3,
        addressList: [],
        curPriduct: {},
        newAddress: {},
        indexAddress: {}
    },

    computed: {
        filterAddress: function () {
            return this.addressList.slice(0, this.limitNum);
        },
    },

    mounted: function () {
        this.$nextTick(function () {
            this.getAddressList();
        });
    },

    methods: {
        delAddress: function () {
            var delIndex = this.addressList.indexOf(this.curPriduct);
            this.addressList.splice(delIndex, 1);
            this.delFlag = false;
        },

        delConfirm: function (item) {
            this.delFlag = true;
            this.curPriduct = item;
        },

        editAddress: function () {
            var editIndex = this.addressList.indexOf(this.indexAddress);
            console.log(editIndex);
            this.addressList[editIndex].userName = this.newAddress.userName;
            this.addressList[editIndex].streetName = this.newAddress.streetName;
            this.addressList[editIndex].tel = this.newAddress.tel;

            console.log(this.addressList[editIndex].userName);
            console.log(this.newAddress.userName);

            this.editFlag = false;
        },

        editConfirm: function (item) {
            this.editFlag = true;
            this.indexAddress = item;
            this.newAddress = JSON.parse(JSON.stringify(item));
        },

        setDefault: function (item) {
            this.addressList.forEach(function (address, index) {
                if (address.addressId == item.addressId) {
                    address.isDefault = true;
                } else {
                    address.isDefault = false;
                }
            });
        },

        loadMore: function () {
            if (this.limitNum == 3) {
                this.limitNum = this.addressList.lenght;
            } else {
                this.limitNum = 3;
            }
        },

        getAddressList: function () {
            this.$http.get('data/address.json', {}).then(res => {
                if (res.body.status == 200) {
                    this.addressList = res.body.result;
                }
            });
        },
    },

});
