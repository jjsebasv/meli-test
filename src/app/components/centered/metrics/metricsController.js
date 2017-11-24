angular.module('meli-test').controller('MetricsController',
  ['$stateParams', 'itemService', 'userService', '$q',
    function ($stateParams, itemService, userService, $q) {
      const itemId = $stateParams.itemid;
      this.loading = true;
      this.error = false;

      const promises = [];

      this.filter = '';

      let seller;

      let similObjects = [];
      const sellerReputations = {};
      this.amountOfCompetitors = 0;
      let amountOfCompetitorsWithLowerReputation = 0;
      let amountOfCompetitorsWithSameReputation = 0;
      let amountOfCompetitorsWithHigherReputation = 0;
      let soldQuantity = 0;
      this.maxSold = 0;

      this.mercadoPago = {
        true: 0,
        false: 0
      };
      this.freeShipping = {
        true: 0,
        false: 0
      };

      const getItemPromise = itemService.getItem(itemId).then(
        (response) => {
          this.item = response.data;
          this.price = this.item.price;
          this.ownSoldQuantity = this.item.sold_quantity;
          this.ownMercadoPago = this.item.accepts_mercadopago;
          this.ownFreeShipping = this.item.shipping.free_shipping;
          const getSellerPromise = getSeller(this.item.seller_id);
          const getSimilPromise = getSimil(true);
          promises.push(getSimilPromise);
          promises.push(getSellerPromise);
        }).catch(
          (error) => {
            this.error = true;
            console.log(error);
          });
      promises.push(getItemPromise);

      const getSimil = (filter) => {
        if (filter) {
          itemService.getAllOfSameFiltered(
            this.item.site_id,
            this.item.category_id,
            this.item.condition,
            this.item.seller_address.search_location.state.id
          ).then(
            (response) => {
              similObjects = response.data.results.filter(
                (obj) => {
                  return obj.id !== this.item.id;
                });
              getAvgPrice();
              getSellerReputations();
              getBuyingMetrics();
            }
          );
        } else {
          itemService.getAllOfSameNotFiltered(
            this.item.site_id,
            this.item.category_id
          ).then(
            (response) => {
              similObjects = response.data.results.filter(
                (obj) => {
                  return obj.id !== this.item.id;
                });
              getAvgPrice();
              getSellerReputations();
              getBuyingMetrics();
            }
          );
        }

      };

      /** Price Metrics **/

      const getAvgPrice = () => {
        let i = 0;
        this.avgPrice = 0;
        similObjects.forEach(
          (item) => {
            i++;
            this.avgPrice += item.price;
          });
        this.avgPrice = this.avgPrice / i;
        const diff = this.price > this.avgPrice ? 'above' : 'below';
        getPercentage(diff);
      };

      const getPercentage = (diff) => {
        this.percentage = 0;
        if (diff === 'above') {
          this.percentage = this.price * 100 / this.avgPrice - 100;
        } else {
          this.percentage = 100 - this.price * 100 / this.avgPrice;
        }
      };

      /** Seller Metrics **/

      const getSeller = (sellerId) => {
        userService.getUser(sellerId).then(
          (response) => {
            seller = response.data;
            this.ownReputation = castReputation(seller);
          }).catch(
            (error) => {
              this.error = true;
              console.log(error);
            });
      };

      const getSellerReputations = () => {
        const sellerPromises = [];
        similObjects.forEach(
          (item) => {
            let user = null;
            soldQuantity += this.item.sold_quantity;
            this.maxSold = this.maxSold < this.item.sold_quantity ? this.item.sold_quantity : this.maxSold;
            const sellerPromise = userService.getUser(item.seller.id).then(
              (response) => {
                user = response.data;
                const reputation = castReputation(user);
                if (angular.isUndefined(sellerReputations[reputation])) {
                  sellerReputations[reputation] = 0;
                }
                sellerReputations[reputation]++;
                this.amountOfCompetitors++;
                if (this.ownReputation === reputation) {
                  amountOfCompetitorsWithSameReputation++;
                } else if (this.ownReputation < reputation) {
                  amountOfCompetitorsWithHigherReputation++;
                } else {
                  amountOfCompetitorsWithLowerReputation++;
                }
              }).catch(
                (error) => {
                  this.error = true;
                  console.log(error);
                });
            sellerPromises.push(sellerPromise);
            promises.push(sellerPromise);
          });
        $q.all(sellerPromises).then(() => {
          finishSellerPromises();
        });
      };

      const castReputation = (user) => {
        let reputation = user.seller_reputation.level_id;
        if (reputation === null) {
          reputation = '0_none';
        }
        return reputation.split('_')[0];
      };

      const finishSellerPromises = () => {
        const mostFrequentReputation = Object.keys(sellerReputations).reduce(
          (a, b) => {
            return sellerReputations[a] > sellerReputations[b] ? a : b;
          });

        this.mostFrequentReputation = {
          level: mostFrequentReputation,
          amount: sellerReputations[mostFrequentReputation]
        };
        this.competitorsPercentage = {
          lower: amountOfCompetitorsWithLowerReputation / this.amountOfCompetitors * 100,
          same: amountOfCompetitorsWithSameReputation / this.amountOfCompetitors * 100,
          higher: amountOfCompetitorsWithHigherReputation / this.amountOfCompetitors * 100
        };
        this.avgSoldQuantity = soldQuantity / this.amountOfCompetitors;
      };

      /** Buying Metrics **/

      const getBuyingMetrics = () => {
        similObjects.forEach(
          (item) => {
            this.mercadoPago[item.accepts_mercadopago]++;
            this.freeShipping[item.shipping.free_shipping]++;
          });
      };

      /** Filters **/

      this.toggleFilters = () => {
        this.loading = true;
        if (this.filter === 'not') {
          this.filter = '';
        } else {
          this.filter = 'not';
        }
        const getSimilPromises = getSimil(this.filter === '');
        promises.push(getSimilPromises);
        $q.all(promises).then(() => {
          finishPromises();
        });
      };

      $q.all(promises).then(() => {
        finishPromises();
      });

      const finishPromises = () => {
        if (!this.error) {
          this.loading = false;
        }
      };

    }
  ]);
