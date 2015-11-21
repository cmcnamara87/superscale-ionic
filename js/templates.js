angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("templates/chat-detail.html","<!--\n  This template loads for the \'tab.friend-detail\' state (app.js)\n  \'friend\' is a $scope variable created in the FriendsCtrl controller (controllers.js)\n  The FriendsCtrl pulls data from the Friends service (service.js)\n  The Friends service returns an array of friend data\n-->\n<ion-view view-title=\"{{chat.name}}\">\n  <ion-content class=\"padding\">\n    <img ng-src=\"{{chat.face}}\" style=\"width: 64px; height: 64px\">\n    <p>\n      {{chat.lastText}}\n    </p>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("templates/items.html","<ion-modal-view>\n    <ion-header-bar>\n        <h1 class=\"title\">My Modal title</h1>\n    </ion-header-bar>\n    <ion-content>\n        <div class=\"list\">\n            <div class=\"item\" ng-repeat=\"item in vm.nutrition\" ng-click=\"vm.selectItem(item); vm.closeModal();\">\n                <strong>{{ item.name }}</strong>\n                Calories {{ item.calories }}\n                Serving Size {{ item.servingSize }}\n            </div>\n        </div>\n    </ion-content>\n</ion-modal-view>");
$templateCache.put("templates/tab-account.html","<ion-view view-title=\"Account\">\n  <ion-content>\n    <ion-list>\n    <ion-toggle  ng-model=\"settings.enableFriends\">\n        Enable Friends\n    </ion-toggle>\n    </ion-list>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("templates/tab-chats.html","<ion-view view-title=\"Chats\">\n  <ion-content>\n    <ion-list>\n      <ion-item class=\"item-remove-animate item-avatar item-icon-right\" ng-repeat=\"chat in chats\" type=\"item-text-wrap\" href=\"#/tab/chats/{{chat.id}}\">\n        <img ng-src=\"{{chat.face}}\">\n        <h2>{{chat.name}}</h2>\n        <p>{{chat.lastText}}</p>\n        <i class=\"icon ion-chevron-right icon-accessory\"></i>\n\n        <ion-option-button class=\"button-assertive\" ng-click=\"remove(chat)\">\n          Delete\n        </ion-option-button>\n      </ion-item>\n    </ion-list>\n  </ion-content>\n</ion-view>\n");
$templateCache.put("templates/tab-dash.html","<ion-view view-title=\"Dashboard 3\">\n    <ion-content class=\"padding\">\n\n        <div class=\"list\">\n            <div class=\"item\">\n                Version Status: {{ vm.autoupdate.state }}\n                <button class=\"button button-positive\"\n                        ng-click=\"vm.autoupdate.check()\">Check\n                </button>\n            </div>\n        </div>\n\n\n        <div class=\"list\">\n            <div class=\"item\">\n                Status: {{ vm.scale.state }}\n            </div>\n        </div>\n        <div class=\"list card\">\n            <div class=\"item item-divider\">Scale</div>\n            <div class=\"item item-body\">\n                Weight {{ vm.scale.getWeight() }}\n\n                <button class=\"button button-positive\"\n                        ng-click=\"vm.scale.tare()\">Tare\n                </button>\n            </div>\n        </div>\n\n        <div class=\"list card\">\n            <div class=\"item item-divider\">Portion</div>\n            <div class=\"item item-body\">\n                <div ng-show=\"vm.selectedItem\">\n                    <strong>{{ vm.portion.item.name }}</strong>\n                    <div>\n                        Calories: {{ vm.portion.getCalories() }}\n                    </div>\n                    <div>\n                        Weight: {{ vm.portion.getWeight() }}\n                    </div>\n                </div>\n                <button class=\"button button-positive\"\n                        ng-click=\"vm.openModal()\">Select Item\n                </button>\n                <button class=\"button button-assertive\"\n                        ng-click=\"vm.addToMeal(vm.portion)\">Add to Meal\n                </button>\n            </div>\n        </div>\n\n        <div class=\"list\">\n            <div class=\"item item-divider\">Meal</div>\n            <div class=\"item\" ng-repeat=\"portion in vm.meal\">\n                <pre>\n                    {{ portion | json }}\n                </pre>\n            </div>\n        </div>\n\n\n    </ion-content>\n</ion-view>\n");
$templateCache.put("templates/tabs.html","<!--\nCreate tabs with an icon and label, using the tabs-positive style.\nEach tab\'s child <ion-nav-view> directive will have its own\nnavigation history that also transitions its views in and out.\n-->\n<ion-tabs class=\"tabs-icon-top tabs-color-active-positive\">\n\n  <!-- Dashboard Tab -->\n  <ion-tab title=\"Status\" icon-off=\"ion-ios-pulse\" icon-on=\"ion-ios-pulse-strong\" href=\"#/tab/dash\">\n    <ion-nav-view name=\"tab-dash\"></ion-nav-view>\n  </ion-tab>\n\n  <!-- Chats Tab -->\n  <ion-tab title=\"Chats\" icon-off=\"ion-ios-chatboxes-outline\" icon-on=\"ion-ios-chatboxes\" href=\"#/tab/chats\">\n    <ion-nav-view name=\"tab-chats\"></ion-nav-view>\n  </ion-tab>\n\n  <!-- Account Tab -->\n  <ion-tab title=\"Account\" icon-off=\"ion-ios-gear-outline\" icon-on=\"ion-ios-gear\" href=\"#/tab/account\">\n    <ion-nav-view name=\"tab-account\"></ion-nav-view>\n  </ion-tab>\n\n\n</ion-tabs>\n");}]);