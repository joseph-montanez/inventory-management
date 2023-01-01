import {IMenu} from "~/types";

const useMenuData = () => {
    const menuData = useState<IMenu>('menu', () => {return ({
        primaryKey: '',
        primarySelectedKeys: [],
        secondaryKey: '',
        secondarySelectedKeys: [],
        trinaryKey: '',
        trinarySelectedKeys: []
    }) as IMenu});

    const setMenuData = (menu: IMenu) => {
        menuData.value = menu
    };

    return {
        menuData,
        setMenuData
    };
}
export default useMenuData
