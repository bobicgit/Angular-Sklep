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
      link: linkFunc,
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
      { id: 1,  category: "sport",     name: "rolki",    price : 200, count: 2, url: "http://urodaizdrowie.pl/wp-content/uploads/2010/04/skate6.jpg"},
      { id: 2,  category: "owoce",     name: "arbuz",    price : 200, count: 6, url: "http://www.niam.pl/rimages/crop/600/450/files/images/PRODUCT/BACKUP/63845620617_zccpfwcewjikqqpkquzo.jpg"},
      { id: 3,  category: "rtv",       name: "myszka",   price : 200, count: 7, url: "http://img.cda.pl/obr/oryginalne/94a93000173e08a43ab806abcc4687c1.jpg"},
      { id: 4,  category: "warzywa",   name: "marchew",  price : 200, count: 8, url: "http://naturalneoczyszczanie.pl/wp-content/uploads/2011/06/marchewka.jpg"},
      { id: 5,  category: "słodycze",  name: "wafelki",  price : 200, count: 4, url: "http://swpanel.pl/userfiles/user_65525/images/427_Neap%202004%20solo.jpg"},
      { id: 6,  category: "owoce",     name: "truskawki",price : 200, count: 3, url: "https://bialczynski.files.wordpress.com/2013/06/aa-12529377small_strawberry__95536.jpg"},
      { id: 7,  category: "sport",     name: "lotki",    price : 200, count: 4, url: "http://automaty.romul.pl/images/dart_point.jpg"},
      { id: 8,  category: "napoje",    name: "whisky",   price : 200, count: 4, url: "http://mackmyra.com/wp-content/uploads/motoerhead_boeurbon_prodbild_2015_new_frilagd.jpg"},
      { id: 9,  category: "owoce",     name: "gruszka",  price : 200, count: 9, url: "http://cdn12.glamka.smcloud.net/s/photos/t/411/cwiczenia_dla_figury_typu_gruszka_12027.jpg"},
      { id: 10, category: "rtv",       name: "pendrive", price : 200, count: 7, url: "http://cdn12.glamka.smcloud.net/s/photos/t/411/cwiczenia_dla_figury_typu_gruszka_12027.jpg"},
      { id: 11, category: "warzywa",   name: "ziemniak", price : 200, count: 4, url: "http://www.odzywianie.info.pl/img/stories/arts/_665x/ziemniaki-kalorie-wartosci-odzywcze-i-ciekawostki.jpg"},
      { id: 12, category: "słodycze",  name: "czekolada",price : 200, count: 8, url: "http://www.facetikuchnia.com.pl/wp-content/uploads/2014/11/Dobre-czekolady_03-610x300.jpg"},
      { id: 13, category: "napoje",    name: "kubuś",    price : 200, count: 2, url: "http://a.pl/zdjecie-569728/kubus-sok-marchew-jablko-malina-300ml-Full"},
      { id: 14, category: "kosmetyki", name: "szampon",  price : 200, count: 3, url: "http://selgros24.pl/images/prodImages/Bambi_SZAMPON_DLA_DZIECI_BAMBI_150ML_72634520_0_1000_1000.jpg"},
      { id: 15, category: "agd",       name: "mikser",   price : 200, count: 5, url: "http://i.wp.pl/a/f/jpeg/31289/misker-kitchen-aid-de69999-mat-pras-640.jpeg"},
      { id: 16, category: "napoje",    name: "cola",     price : 200, count: 1, url: "http://enpide.com/wp-content/uploads/2015/12/coca-cola-kutu-330-mlcanyeni.jpg"},
      { id: 17, category: "owoce",     name: "jagody",   price : 200, count: 2, url: "http://pu.i.wp.pl/k,NDY3MjQyMzksNzIyNjg5,f,DSC04237_16_medium.jpg"},
      { id: 18, category: "warzywa",   name: "pomidor",  price : 200, count: 7, url: "http://www.mango.wroclaw.pl/files/oferta/1/pomidor-galazka1.jpg"},
      { id: 19, category: "słodycze",  name: "żelki",    price : 200, count: 7, url: "http://www.tapeciarnia.pl/tapety/normalne/71379_slodkie_zelki_miski.jpg"},
      { id: 20, category: "rtv",       name: "słuchawki",price : 200, count: 9, url: "http://www.eioba.org/files/user72231/a231825/sluchawki-nauszne-niebieskie.jpg"},
      { id: 21, category: "owoce",     name: "banan",    price : 200, count: 7, url: "http://www.acaipolska.com/wp-content/uploads/2015/07/Banany.png"},
      { id: 22, category: "owoce",     name: "ananas",   price : 200, count: 7, url: "http://findfresh.co.in/wp-content/uploads/2015/09/pineapple-ananas.jpg"},
      { id: 23, category: "kosmetyki", name: "szminka",  price : 200, count: 8, url: "http://www.siewie.pl/zdjecia/czerwona-szminka.jpg"},
      { id: 24, category: "sport",     name: "rakieta",  price : 200, count: 2, url: "http://www.cess.com.pl/qone/files/red%20star%202.png"},
      { id: 25, category: "warzywa",   name: "por",      price : 200, count: 3, url: "http://kbz-nasiona.pl/wp-content/uploads/2014/01/por-kopia.jpg"},
      { id: 26, category: "agd",       name: "szybkowar",price : 200, count: 3, url: "http://i387.photobucket.com/albums/oo317/marlenamitura/szybkowar_zps8ec11e29.jpg"},
      { id: 27, category: "sport",     name: "piłka",    price : 200, count: 2, url: "http://r-scale-b3.dcs.redcdn.pl/scale/o2/tvn/web-content/m/p1/i/aff0a6a4521232970b2c1cf539ad0a19/5648afa8-3ff5-4f77-bcde-9e970409df0e.jpg?type=1&srcmode=4&srcx=0/1&srcy=0/1&srcw=640&srch=2000&dstw=640&dsth=2000&quality=80"},
      { id: 28, category: "warzywa",   name: "kapusta",  price : 200, count: 5, url: "http://zycienaszczycie.pl/wp-content/uploads/2012/10/kapusta.jpg"}  ];

      vm.categories = [];
      vm.itemsInCategory = [];
      vm.filterCategory = { category : vm.category };
      vm.category = "choose category";

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

    }

    function linkFunc (scope, element, attrs) {

      element.on('click', '.btn-category', function () {
        var category = $(this).find('a').text();

        console.log(category);
        // var category = $(this).find('a').text();
        // element.find('.input-category').val(category); 
        // scope.mc.filterCategory = {category: category};

        // scope.mc.itemsInCategory = itemsSorted[category];
        // console.log(scope.mc.itemsInCategory);
        // console.log(attrs);

      })
      
    }


  }

})();
