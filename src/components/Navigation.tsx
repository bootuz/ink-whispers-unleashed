
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { Link, useLocation } from "react-router-dom"
import { Home, Book, Users } from "lucide-react"

export const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <NavigationMenu className="max-w-full w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 z-50 border-b">
      <NavigationMenuList className="max-w-7xl w-full mx-auto px-4 h-14">
        <NavigationMenuItem>
          <Link to="/">
            <NavigationMenuLink 
              className={`${navigationMenuTriggerStyle()} ${isActive('/') ? 'bg-purple-100 text-purple-800' : ''}`}
            >
              <Home className="mr-2 h-4 w-4" />
              Унэр
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/poems">
            <NavigationMenuLink 
              className={`${navigationMenuTriggerStyle()} ${isActive('/poems') ? 'bg-purple-100 text-purple-800' : ''}`}
            >
              <Book className="mr-2 h-4 w-4" />
              Усэхэр
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/authors">
            <NavigationMenuLink 
              className={`${navigationMenuTriggerStyle()} ${isActive('/authors') ? 'bg-purple-100 text-purple-800' : ''}`}
            >
              <Users className="mr-2 h-4 w-4" />
              УсакIуэхэр
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
