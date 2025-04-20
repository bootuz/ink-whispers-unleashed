
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { Link } from "react-router-dom"
import { Home, Book, Users } from "lucide-react"

export const Navigation = () => {
  return (
    <NavigationMenu className="max-w-full w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 z-50 border-b">
      <NavigationMenuList className="max-w-7xl w-full mx-auto px-4 h-14">
        <NavigationMenuItem>
          <Link to="/">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Home className="mr-2 h-4 w-4" />
              Унэр
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/poems">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Book className="mr-2 h-4 w-4" />
              Усэхэр
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/authors">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Users className="mr-2 h-4 w-4" />
              УсакIуэхэр
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
