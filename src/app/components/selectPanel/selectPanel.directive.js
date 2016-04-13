(function() {
  'use strict';

  angular
    .module('yoman')
    .directive('selectPanel', selectPanel);

  /** @ngInject */
  function selectPanel() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/selectPanel/selectPanel.html',
      // scope: {
      //     creationDate: '='
      // },
      controller: SelectPanelController,
      controllerAs: 'vm',
      bindToController: true
    };


    return directive;

    /** @ngInject */
    function SelectPanelController() {

      // "sp.creationDate" is available by directive option "bindToController: true"
      var vm = this;

       vm.allItems = [
      { id: 1,  category: "sport",     name: "rolki",    price : 299, count: 2, url: "http://urodaizdrowie.pl/wp-content/uploads/2010/04/skate6.jpg"},
      { id: 2,  category: "owoce",     name: "arbuz",    price : 7.99,count: 6, url: "http://www.niam.pl/rimages/crop/600/450/files/images/PRODUCT/BACKUP/63845620617_zccpfwcewjikqqpkquzo.jpg"},
      { id: 3,  category: "rtv",       name: "myszka",   price : 55 , count: 7, url: "http://img.cda.pl/obr/oryginalne/94a93000173e08a43ab806abcc4687c1.jpg"},
      { id: 4,  category: "warzywa",   name: "marchew",  price : 3.5, count: 8, url: "http://naturalneoczyszczanie.pl/wp-content/uploads/2011/06/marchewka.jpg"},
      { id: 5,  category: "słodycze",  name: "wafelki",  price : 2.8, count: 4, url: "http://swpanel.pl/userfiles/user_65525/images/427_Neap%202004%20solo.jpg"},
      { id: 6,  category: "owoce",     name: "truskawki",price : 8,   count: 3, url: "https://bialczynski.files.wordpress.com/2013/06/aa-12529377small_strawberry__95536.jpg"},
      { id: 7,  category: "sport",     name: "lotki",    price : 150, count: 4, url: "http://www.carpediem.pl/upl/departments/news/f883adab2d97b8d6bafcd8e45dce0308.jpg"},
      { id: 8,  category: "napoje",    name: "whisky",   price : 80,  count: 4, url: "http://uncrate.com/p/2015/07/barrel-proof-jd.jpg"},
      { id: 9,  category: "owoce",     name: "gruszka",  price : 4.90,count: 9, url: "http://cdn12.glamka.smcloud.net/s/photos/t/411/cwiczenia_dla_figury_typu_gruszka_12027.jpg"},
      { id: 10, category: "rtv",       name: "pendrive", price : 60,  count: 7, url: "http://ecsmedia.pl/c/pendrive-adata-uv150-16gb-czerwony-b-iext24168174.jpg"},
      { id: 11, category: "warzywa",   name: "ziemniak", price : 2.5, count: 4, url: "http://www.niam.pl/rimages/crop/600/450/files/images/PRODUCT/BACKUP/31334212547_njnmftduspherdspibtc.jpg"},
      { id: 12, category: "słodycze",  name: "czekolada",price : 3.5, count: 8, url: "http://www.facetikuchnia.com.pl/wp-content/uploads/2014/11/Dobre-czekolady_03-610x300.jpg"},
      { id: 13, category: "napoje",    name: "kubuś",    price : 2.4, count: 2, url: "http://a.pl/zdjecie-569728/kubus-sok-marchew-jablko-malina-300ml-Full"},
      { id: 14, category: "kosmetyki", name: "szampon",  price : 4.4, count: 3, url: "http://selgros24.pl/images/prodImages/Bambi_SZAMPON_DLA_DZIECI_BAMBI_150ML_72634520_0_1000_1000.jpg"},
      { id: 15, category: "agd",       name: "mikser",   price : 120, count: 5, url: "http://i.wp.pl/a/f/jpeg/31289/misker-kitchen-aid-de69999-mat-pras-640.jpeg"},
      { id: 16, category: "napoje",    name: "cola",     price : 3,   count: 1, url: "http://enpide.com/wp-content/uploads/2015/12/coca-cola-kutu-330-mlcanyeni.jpg"},
      { id: 17, category: "owoce",     name: "jagody",   price : 10,  count: 2, url: "http://pu.i.wp.pl/k,NDY3MjQyMzksNzIyNjg5,f,DSC04237_16_medium.jpg"},
      { id: 18, category: "warzywa",   name: "pomidor",  price : 8,   count: 7, url: "http://www.mango.wroclaw.pl/files/oferta/1/pomidor-galazka1.jpg"},
      { id: 19, category: "słodycze",  name: "żelki",    price : 3,   count: 7, url: "http://www.tapeciarnia.pl/tapety/normalne/71379_slodkie_zelki_miski.jpg"},
      { id: 20, category: "rtv",       name: "słuchawki",price : 450, count: 9, url: "http://www.eioba.org/files/user72231/a231825/sluchawki-nauszne-niebieskie.jpg"},
      { id: 21, category: "owoce",     name: "banan",    price : 4,   count: 7, url: "http://www.acaipolska.com/wp-content/uploads/2015/07/Banany.png"},
      { id: 22, category: "owoce",     name: "ananas",   price : 12,  count: 7, url: "http://findfresh.co.in/wp-content/uploads/2015/09/pineapple-ananas.jpg"},
      { id: 23, category: "kosmetyki", name: "szminka",  price : 30,  count: 8, url: "http://www.siewie.pl/zdjecia/czerwona-szminka.jpg"},
      { id: 24, category: "sport",     name: "rakieta",  price : 800, count: 2, url: "http://www.cess.com.pl/qone/files/red%20star%202.png"},
      { id: 25, category: "warzywa",   name: "por",      price : 3,   count: 3, url: "http://kbz-nasiona.pl/wp-content/uploads/2014/01/por-kopia.jpg"},
      { id: 26, category: "agd",       name: "szybkowar",price : 400, count: 3, url: "http://i387.photobucket.com/albums/oo317/marlenamitura/szybkowar_zps8ec11e29.jpg"},
      { id: 27, category: "sport",     name: "piłka",    price : 90,  count: 2, url: "http://r-scale-b3.dcs.redcdn.pl/scale/o2/tvn/web-content/m/p1/i/aff0a6a4521232970b2c1cf539ad0a19/5648afa8-3ff5-4f77-bcde-9e970409df0e.jpg?type=1&srcmode=4&srcx=0/1&srcy=0/1&srcw=640&srch=2000&dstw=640&dsth=2000&quality=80"},
      { id: 28, category: "warzywa",   name: "kapusta",  price : 3,   count: 5, url: "http://zycienaszczycie.pl/wp-content/uploads/2012/10/kapusta.jpg"},
      { id: 29, category: "sport",     name: "rower",    price : 890, count: 2, url: "http://wrower.pl/images/strony/004/full/kupowanie_rower_gorski.jpg"},
      { id: 31, category: "rtv",       name: "boombox",  price : 400, count: 7, url: "http://img18.staticclassifieds.com/images_tablicapl/349090153_1_644x461_boombox-kolorowy-dla-dzieci-boombox-czarny-cd-z-mp3-radio-kasety-aux-wolomin.jpg"},
      { id: 32, category: "warzywa",   name: "szczypior",price : 2.5, count: 8, url: "http://www.spolem.lubin.pl/public/produkty/325_Szczypiorek_z_cebulka.JPG"},
      { id: 33, category: "słodycze",  name: "dropsy",   price : 1.8, count: 4, url: "http://www.bezglutenowcy.pl/web/uploads/obrazki_duze/130.jpg"},
      { id: 34, category: "owoce",     name: "maliny",   price : 12,  count: 3, url: "http://www.mojpieknyogrod.pl/gfx/00/00/4c/60/image-15jl8dj_jpg/thumb_560x800_10.jpg"},
      { id: 35, category: "sport",     name: "motorówka",price : 6000,count: 4, url: "http://static1.redcart.pl/templates/images/thumb/10107/800/800/pl/0/templates/images/products/10107/bdc42d070cd6359470390a3ad662c6cf.jpg"},
      { id: 36, category: "napoje",    name: "żubr",     price : 200, count: 4, url: "http://static.promoceny.pl/foto/vyrobky/053750/53676.jpg"},
      { id: 37, category: "sport",     name: "motor",    price : 3000,count: 9, url: "http://img1.sprzedajemy.pl/540x405_motor-neken-4581066.jpg"},
      { id: 38, category: "rtv",       name: "laptop",   price : 2900,count: 7, url: "http://ecx.images-amazon.com/images/I/81niKn3VVPL._SL1500_.jpg"},
      { id: 39, category: "rtv",       name: "plazma",   price : 3500,count: 4, url: "http://i.wp.pl/a/f/jpeg/22360/funai-telewizor-lt6-m19bb-490.jpeg"},
      { id: 40, category: "agd",       name: "pralka",   price : 1800,count: 8, url: "http://jotem.in/wp-content/uploads/2014/05/pralka.jpg"},
      { id: 41, category: "agd",       name: "czajnik",  price : 200, count: 2, url: "http://img.shmbk.pl/rimgspr/22218743_max_300_400_dla-domu-do-kuchni-i-jadalni-do-gotowania-czajniki-florina-koper-czajnik-2-2-l.jpg"},
      { id: 42, category: "sport",     name: "łyżwy",    price : 1500,count: 3, url: "http://aba-sport.pl/pol_pl_Lyzwy-figurowe-Classic-Spokey-3541_3.jpg"},
      { id: 43, category: "sport",     name: "latawiec", price : 800, count: 5, url: "http://www.rai-bud.pl/1zdj/latawce/Latawiec_akrobacyjny_cyclone_150gx_1034_1_zw700"},
      { id: 44, category: "napoje",    name: "oranżada", price : 2.5, count: 1, url: "http://www.kliknijwzdrowie.pl/wp-content/uploads/2015/05/Hellena_szklana_butelka-e1432552844387-1024x332.png"},
      { id: 45, category: "rtv",       name: "gramofon", price : 2000,count: 2, url: "http://thumbs.dreamstime.com/z/klasyczny-gramofon-43882761.jpg"},
      { id: 46, category: "sport",     name: "bilard",   price : 9000,count: 7, url: "http://sklep.smjsport.pl/pol_pl_Mini-bilard-Solex-sports-91311-1178_3.jpg"},
      { id: 47, category: "sport",     name: "kij",      price : 700, count: 7, url: "http://resources1.news.com.au/images/2011/04/08/1226036/171989-baseball-bat.jpg"},
      { id: 48, category: "sport",     name: "koszulka", price : 200, count: 9, url: "http://tomasport.pl/images/Koszulka-Nike-Fc-Barcelona-532811-411-4.jpg"},
      { id: 49, category: "kosmetyki", name: "perfumy",  price : 450, count: 7, url: "http://polki.pl/work/privateimages/formats/E/24847.jpg"},
      { id: 50, category: "sport",     name:"paralotnia",price : 800, count: 7, url: "http://www.komel.katowice.pl/images/paralotniawlocie.jpg"},
      { id: 51, category: "rtv",       name: "iPhone",   price : 3000,count: 8, url: "http://applemobile.pl/wp-content/uploads/2015/11/Ikona4.jpg"},
      { id: 52, category: "rtv",       name: "tablet",   price : 2000,count: 2, url: "http://serwis-laptopy.pl/images/ilustracje/razer-edge-5-100020387-orig.png"} ];

      vm.categories = [];
      vm.filterCategory = { category : vm.category };
      vm.category = "choose category";
      vm.setCategory = setCategory;
      vm.chooseCategory = "choose category";

      vm.priceRangesMin = [0, 20, 50, 200, 500, 1000, 2000, 5000];
      vm.priceRangesMax = [20, 50, 200, 500, 1000, 2000, 5000, 10000];
      vm.priceMin = 0;
      vm.priceMax = 10000;
      vm.updatePriceMin = updatePriceMin;
      vm.updatePriceMax = updatePriceMax;

      vm.itemsOnPage = [10, 20, 30, 'all'];
      vm.itemsOnPageSelected = 10;
      vm.updateItemsOnPageAmount = updateItemsOnPageAmount;

      vm.availablePages;
      vm.pagesAmount;
      vm.updatePagesAmount = vm.updatePagesAmount;
      vm.currentPage = 1;
      vm.updatePage = updatePage;
      vm.changePagePreview = changePagePreview;
      vm.changePageNext = changePageNext;

      vm.changePictureSize = changePictureSize;
      vm.pictureSize;

      
   
      updateCategoryList();




      function updateCategoryList () {
        //sorts data depending on its category

        // creates array with categories without repeatings
        vm.allItems.forEach(function (item) {
          if (vm.categories.includes(item.category) === false) {
            vm.categories.push(item.category);
          }
        });
      }


      function setCategory (category) {
        if ( category ) {
        vm.chooseCategory = category;
        vm.filterCategory = {category: category};
        console.log(vm.filterCategory);
        } else {
        vm.chooseCategory = "choose category";
        vm.filterCategory = {};

        }
      }

      function updatePriceMin (value) {
        vm.priceMin = value;
      } 

      function updatePriceMax (value) {
        vm.priceMax = value;
      } 


      function updateItemsOnPageAmount (value) {
        vm.itemsOnPageSelected = value;
        vm.currentPage = 1;
      }


      function updatePage (value) {
        vm.currentPage = value;
      }

      function changePagePreview () {
        if (vm.currentPage > 1) {
          vm.currentPage --;
        }
      }

      function changePageNext () {
          vm.currentPage ++;
      }

      function changePictureSize (size) {
        vm.pictureSize = size;
      } 
      

        
    }


      
 }


})();
