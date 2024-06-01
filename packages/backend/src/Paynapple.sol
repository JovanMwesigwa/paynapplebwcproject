// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Paynapple {
    enum Category {
        Burgers,
        Desserts,
        Drinks
    }

    enum SalesType {
        Menu,
        InStore,
        Online
    }

    IERC20 private stableCoin;

    uint256 private s_menuItemsCount;
    uint256 private s_burgersCount;
    uint256 private s_dessertsCount;
    uint256 private s_drinksCount;
    address private i_owner;

    struct MenuItem {
        uint256 id;
        string name;
        string image;
        string description;
        uint256 price;
        Category itemCategory;
        uint256 stockCount;
    }

    struct Sale {
        string name;
        SalesType salesType;
        uint256 amount;
        uint256 increase;
    }

    // Array of menu items
    MenuItem[] private s_menuItems;

    // Mapping of item name to item index
    mapping(uint256 => MenuItem) private s_itemInfo;

    mapping(SalesType => Sale) private s_sales;

    // events
    event MenuItemAdded(
        uint256 id,
        string name,
        string description,
        uint256 price,
        Category itemCategory
    );

    constructor(address _stableCoin) {
        i_owner = msg.sender;
        stableCoin = IERC20(_stableCoin);

        // Create Menu Items
        createStarterData();
    }

    // errors
    error Paynapple__NotAuthorized();

    // Add a new menu item
    function addMenuItem(
        string memory name,
        string memory description,
        string memory image,
        uint256 price,
        Category itemCategory,
        uint256 stockCount
    ) public onlyOwner {
        MenuItem memory newItem = MenuItem({
            id: s_menuItemsCount,
            name: name,
            description: description,
            image: image,
            price: price,
            itemCategory: itemCategory,
            stockCount: stockCount
        });

        s_menuItems.push(newItem);

        // itemIndex[name] = s_menuItemsCount;
        s_itemInfo[s_menuItemsCount] = newItem;

        s_menuItemsCount++;

        // Update the corresponging item count e.g. burgerCount or dessertCount or drinkCount
        if (itemCategory == Category.Burgers) {
            s_burgersCount++;
        } else if (itemCategory == Category.Desserts) {
            s_dessertsCount++;
        } else if (itemCategory == Category.Drinks) {
            s_drinksCount++;
        }

        emit MenuItemAdded(
            s_menuItemsCount,
            name,
            description,
            price,
            itemCategory
        );
    }

    function editItem(
        uint256 id,
        string memory name,
        string memory description,
        string memory image,
        uint256 price,
        Category itemCategory,
        uint256 stockCount
    ) public onlyOwner {
        s_menuItems[id].name = name;
        s_menuItems[id].description = description;
        s_menuItems[id].image = image;
        s_menuItems[id].price = price;
        s_menuItems[id].itemCategory = itemCategory;
        s_menuItems[id].stockCount = stockCount;

        s_itemInfo[id] = s_menuItems[id];
    }

    modifier onlyOwner() {
        if (msg.sender != i_owner) {
            revert Paynapple__NotAuthorized();
        }
        _;
    }

    // View function to get the number of menu items
    function getBalance() public view returns (uint256) {
        return stableCoin.balanceOf(address(this));
    }

    function getAllMenuItems() public view returns (MenuItem[] memory) {
        return s_menuItems;
    }

    function getBurgers() public view returns (MenuItem[] memory) {
        MenuItem[] memory burgers = new MenuItem[](s_menuItemsCount);
        uint256 burgerCount = 0;

        for (uint256 i = 0; i < s_menuItemsCount; i++) {
            if (s_menuItems[i].itemCategory == Category.Burgers) {
                burgers[burgerCount] = s_menuItems[i];
                burgerCount++;
            }
        }

        return burgers;
    }

    function getDesserts() public view returns (MenuItem[] memory) {
        MenuItem[] memory desserts = new MenuItem[](s_menuItemsCount);
        uint256 dessertCount = 0;

        for (uint256 i = 0; i < s_menuItemsCount; i++) {
            if (s_menuItems[i].itemCategory == Category.Desserts) {
                desserts[dessertCount] = s_menuItems[i];
                dessertCount++;
            }
        }

        return desserts;
    }

    function getDrinks() public view returns (MenuItem[] memory) {
        MenuItem[] memory drinks = new MenuItem[](s_menuItemsCount);
        uint256 drinkCount = 0;

        for (uint256 i = 0; i < s_menuItemsCount; i++) {
            if (s_menuItems[i].itemCategory == Category.Drinks) {
                drinks[drinkCount] = s_menuItems[i];
                drinkCount++;
            }
        }

        return drinks;
    }

    function getMenuItem(uint256 id) public view returns (MenuItem memory) {
        return s_itemInfo[id];
    }

    function getMenuItemsCount() public view returns (uint256) {
        return s_menuItemsCount;
    }

    function getOwner() public view returns (address) {
        return i_owner;
    }

    function getAllMenuSales() public view returns (Sale[] memory) {
        Sale[] memory sales = new Sale[](3);
        sales[0] = s_sales[SalesType.Menu];
        sales[1] = s_sales[SalesType.InStore];
        sales[2] = s_sales[SalesType.Online];

        return sales;
    }

    function getBurgerCount() public view returns (uint256) {
        return s_burgersCount;
    }

    function getDessertCount() public view returns (uint256) {
        return s_dessertsCount;
    }

    function getDrinkCount() public view returns (uint256) {
        return s_drinksCount;
    }

    // Helper functions

    function createStarterData() internal {
        // Create Menu sales
        s_sales[SalesType.Menu] = Sale("Menu", SalesType.Menu, 0, 0);
        s_sales[SalesType.InStore] = Sale("In-Store", SalesType.InStore, 0, 0);
        s_sales[SalesType.Online] = Sale("Online", SalesType.Online, 0, 0);

        addMenuItem(
            "Cheeseburger",
            "A delicious cheeseburger",
            "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=2097&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            10,
            Category.Burgers,
            100
        );

        addMenuItem(
            "Chocolate Cake",
            "A delicious chocolate cake",
            "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=2304&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            5,
            Category.Desserts,
            100
        );

        addMenuItem(
            "Coke",
            "A refreshing coke",
            "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            2,
            Category.Drinks,
            100
        );

        addMenuItem(
            "Fries",
            "A delicious fries",
            "https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            3,
            Category.Drinks,
            100
        );
    }
}
