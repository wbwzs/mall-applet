"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = require("../../utils/request");
Page({
    data: {
        id: 0,
        goods: null,
        addresses: [],
        selectedAddressId: 0,
        loading: false
    },
    onLoad: function (options) {
        this.setData({ id: options.id });
    },
    onShow: function () {
        this.loadGoods();
        this.loadAddresses();
    },
    loadGoods: function () {
        var self = this;
        request_1.default({
            url: "/index/goods/show?id=" + this.data.id,
            success: function (goods) {
                self.setData({ goods: goods });
            },
            fail: function (e) {
                wx.showToast({ title: e.errMsg, icon: 'none' });
            }
        });
    },
    loadAddresses: function () {
        var self = this;
        request_1.default({
            url: '/index/address/all',
            success: function (addresses) {
                self.setData({ addresses: addresses });
                var selectedAddressId = 0;
                addresses.forEach(function (item) {
                    if (item.default) {
                        selectedAddressId = item.id;
                    }
                });
                if (selectedAddressId === 0 && addresses.length > 0) {
                    selectedAddressId = addresses[0].id;
                }
                self.setData({ selectedAddressId: selectedAddressId });
            }
        });
    },
    handleAddressTap: function (e) {
        var id = e.currentTarget.dataset.id;
        this.setData({ selectedAddressId: id });
    },
    handleAddAddress: function () {
        wx.navigateTo({
            url: '/pages/address/create'
        });
    },
    handleBuy: function () {
        if (!this.data.selectedAddressId) {
            wx.showToast({ title: '请完善地址信息', icon: 'none' });
            return;
        }
        this.buy();
    },
    buy: function () {
        var _this = this;
        this.setData({ loading: true });
        var address = this.data.addresses.filter(function (item) { return item.id === _this.data.selectedAddressId; })[0];
        var data = {
            goods_id: this.data.id,
            realname: address.realname,
            phone: address.phone,
            address: address.address
        };
        var self = this;
        request_1.default({
            url: '/index/goods/buy',
            method: 'POST',
            data: data,
            success: function (order) {
                self.pay(order);
            },
            fail: function (e) {
                wx.showToast({ title: e.errMsg, icon: 'none' });
                this.setData({ loading: false });
            }
        });
    },
    pay: function (order) {
        request_1.default({
            url: "/index/order/pay?order_id=" + order.order_id,
            success: function () {
                setTimeout(function () { return wx.redirectTo({
                    url: "/pages/order/detail?id=" + order.order_id
                }); }, 1500);
            },
            fail: function (e) {
                wx.showToast({ title: e.errMsg, icon: 'none' });
            },
            complete: function () {
                this.setData({ loading: false });
            }
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnV5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQTBDO0FBUTFDLElBQUksQ0FBQztJQUNILElBQUksRUFBRTtRQUNKLEVBQUUsRUFBRSxDQUFDO1FBQ0wsS0FBSyxFQUFFLElBQUk7UUFDWCxTQUFTLEVBQUUsRUFBRTtRQUNiLGlCQUFpQixFQUFFLENBQUM7UUFDcEIsT0FBTyxFQUFFLEtBQUs7S0FDZjtJQUNELE1BQU0sWUFBQyxPQUFZO1FBQ2pCLElBQUksQ0FBQyxPQUFRLENBQUMsRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDbkMsQ0FBQztJQUNELE1BQU07UUFDSixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUE7UUFDaEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFBO0lBQ3RCLENBQUM7SUFDRCxTQUFTO1FBQ1AsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBQ2pCLGlCQUFPLENBQUM7WUFDTixHQUFHLEVBQUUsMEJBQXdCLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBSTtZQUMzQyxPQUFPLFlBQUMsS0FBVTtnQkFDaEIsSUFBSSxDQUFDLE9BQVEsQ0FBQyxFQUFFLEtBQUssT0FBQSxFQUFFLENBQUMsQ0FBQTtZQUMxQixDQUFDO1lBQ0QsSUFBSSxZQUFDLENBQU07Z0JBQ1QsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO1lBQ2pELENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsYUFBYTtRQUNYLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQTtRQUNqQixpQkFBTyxDQUFDO1lBQ04sR0FBRyxFQUFFLG9CQUFvQjtZQUN6QixPQUFPLFlBQUMsU0FBYztnQkFDcEIsSUFBSSxDQUFDLE9BQVEsQ0FBQyxFQUFFLFNB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QixLQUFLLENBQUMsUUFBVTtpQkFDaEQsQ0FBQyxFQUZlLENBRWYsRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUNYLENBQUM7WUFDRCxJQUFJLFlBQUMsQ0FBTTtnQkFDVCxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7WUFDakQsQ0FBQztZQUNELFFBQVE7Z0JBQ04sSUFBSSxDQUFDLE9BQVEsQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO1lBQ25DLENBQUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHJlcXVlc3QgZnJvbSBcIi4uLy4uL3V0aWxzL3JlcXVlc3RcIjtcblxuLy9pbmRleC5qc1xuLy/ojrflj5blupTnlKjlrp7kvotcbi8vIGltcG9ydCB7IElNeUFwcCB9IGZyb20gJy4uLy4uL2FwcCdcblxuLy8gY29uc3QgYXBwID0gZ2V0QXBwPElNeUFwcD4oKVxuXG5QYWdlKHtcbiAgZGF0YToge1xuICAgIGlkOiAwLFxuICAgIGdvb2RzOiBudWxsLFxuICAgIGFkZHJlc3NlczogW10sXG4gICAgc2VsZWN0ZWRBZGRyZXNzSWQ6IDAsXG4gICAgbG9hZGluZzogZmFsc2VcbiAgfSxcbiAgb25Mb2FkKG9wdGlvbnM6IGFueSkge1xuICAgIHRoaXMuc2V0RGF0YSEoeyBpZDogb3B0aW9ucy5pZCB9KVxuICB9LFxuICBvblNob3coKSB7XG4gICAgdGhpcy5sb2FkR29vZHMoKVxuICAgIHRoaXMubG9hZEFkZHJlc3NlcygpXG4gIH0sXG4gIGxvYWRHb29kcygpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpc1xuICAgIHJlcXVlc3Qoe1xuICAgICAgdXJsOiBgL2luZGV4L2dvb2RzL3Nob3c/aWQ9JHt0aGlzLmRhdGEuaWR9YCxcbiAgICAgIHN1Y2Nlc3MoZ29vZHM6IGFueSkge1xuICAgICAgICBzZWxmLnNldERhdGEhKHsgZ29vZHMgfSlcbiAgICAgIH0sXG4gICAgICBmYWlsKGU6IGFueSkge1xuICAgICAgICB3eC5zaG93VG9hc3QoeyB0aXRsZTogZS5lcnJNc2csIGljb246ICdub25lJyB9KVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIGxvYWRBZGRyZXNzZXMoKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXNcbiAgICByZXF1ZXN0KHtcbiAgICAgIHVybDogJy9pbmRleC9hZGRyZXNzL2FsbCcsXG4gICAgICBzdWNjZXNzKGFkZHJlc3NlczogYW55KSB7XG4gICAgICAgIHNlbGYuc2V0RGF0YSEoeyBhZGRyZXNzZXMgfSlcbiAgICAgICAgbGV0IHNlbGVjdGVkQWRkcmVzc0lkID0gMFxuICAgICAgICBhZGRyZXNzZXMuZm9yRWFjaCgoaXRlbTogYW55KSA9PiB7XG4gICAgICAgICAgaWYgKGl0ZW0uZGVmYXVsdCkge1xuICAgICAgICAgICAgc2VsZWN0ZWRBZGRyZXNzSWQgPSBpdGVtLmlkXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBpZiAoc2VsZWN0ZWRBZGRyZXNzSWQgPT09IDAgJiYgYWRkcmVzc2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBzZWxlY3RlZEFkZHJlc3NJZCA9IGFkZHJlc3Nlc1swXS5pZFxuICAgICAgICB9XG4gICAgICAgIHNlbGYuc2V0RGF0YSEoeyBzZWxlY3RlZEFkZHJlc3NJZCB9KVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIGhhbmRsZUFkZHJlc3NUYXAoZTogYW55KSB7XG4gICAgY29uc3QgaWQgPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZFxuICAgIHRoaXMuc2V0RGF0YSEoeyBzZWxlY3RlZEFkZHJlc3NJZDogaWQgfSlcbiAgfSxcbiAgaGFuZGxlQWRkQWRkcmVzcygpIHtcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgIHVybDogJy9wYWdlcy9hZGRyZXNzL2NyZWF0ZSdcbiAgICB9KVxuICB9LFxuICBoYW5kbGVCdXkoKSB7XG4gICAgaWYgKCF0aGlzLmRhdGEuc2VsZWN0ZWRBZGRyZXNzSWQpIHtcbiAgICAgIHd4LnNob3dUb2FzdCh7IHRpdGxlOiAn6K+35a6M5ZaE5Zyw5Z2A5L+h5oGvJywgaWNvbjogJ25vbmUnIH0pXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgdGhpcy5idXkoKVxuICB9LFxuICBidXkoKSB7XG4gICAgdGhpcy5zZXREYXRhISh7IGxvYWRpbmc6IHRydWUgfSlcbiAgICBjb25zdCBhZGRyZXNzOiBhbnkgPSB0aGlzLmRhdGEuYWRkcmVzc2VzLmZpbHRlcigoaXRlbTogYW55KSA9PiBpdGVtLmlkID09PSB0aGlzLmRhdGEuc2VsZWN0ZWRBZGRyZXNzSWQpWzBdXG4gICAgY29uc3QgZGF0YSA9IHtcbiAgICAgIGdvb2RzX2lkOiB0aGlzLmRhdGEuaWQsXG4gICAgICByZWFsbmFtZTogYWRkcmVzcy5yZWFsbmFtZSxcbiAgICAgIHBob25lOiBhZGRyZXNzLnBob25lLFxuICAgICAgYWRkcmVzczogYWRkcmVzcy5hZGRyZXNzXG4gICAgfTtcbiAgICBjb25zdCBzZWxmID0gdGhpc1xuICAgIHJlcXVlc3Qoe1xuICAgICAgdXJsOiAnL2luZGV4L2dvb2RzL2J1eScsXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGRhdGEsXG4gICAgICBzdWNjZXNzKG9yZGVyOiBhbnkpIHtcbiAgICAgICAgc2VsZi5wYXkob3JkZXIpXG4gICAgICB9LFxuICAgICAgZmFpbChlOiBhbnkpIHtcbiAgICAgICAgd3guc2hvd1RvYXN0KHsgdGl0bGU6IGUuZXJyTXNnLCBpY29uOiAnbm9uZScgfSlcbiAgICAgICAgdGhpcy5zZXREYXRhISh7IGxvYWRpbmc6IGZhbHNlIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfSxcbiAgcGF5KG9yZGVyOiBhbnkpIHtcbiAgICByZXF1ZXN0KHtcbiAgICAgIHVybDogYC9pbmRleC9vcmRlci9wYXk/b3JkZXJfaWQ9JHtvcmRlci5vcmRlcl9pZH1gLFxuICAgICAgc3VjY2VzcygpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB3eC5yZWRpcmVjdFRvKHtcbiAgICAgICAgICB1cmw6IGAvcGFnZXMvb3JkZXIvZGV0YWlsP2lkPSR7b3JkZXIub3JkZXJfaWR9YFxuICAgICAgICB9KSwgMTUwMClcbiAgICAgIH0sXG4gICAgICBmYWlsKGU6IGFueSkge1xuICAgICAgICB3eC5zaG93VG9hc3QoeyB0aXRsZTogZS5lcnJNc2csIGljb246ICdub25lJyB9KVxuICAgICAgfSxcbiAgICAgIGNvbXBsZXRlKCkge1xuICAgICAgICB0aGlzLnNldERhdGEhKHsgbG9hZGluZzogZmFsc2UgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG59KVxuIl19