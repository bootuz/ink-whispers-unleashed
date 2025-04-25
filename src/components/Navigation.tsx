
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { Link, useLocation } from "react-router-dom"
import { Home, Book, Users } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

export const Navigation = () => {
  const location = useLocation();
  const isMobile = useIsMobile();

  const isActive = (path: string) => location.pathname === path;

  return (
    <NavigationMenu className="max-w-full w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 z-50 border-b">
      <NavigationMenuList className={`${isMobile ? 'flex flex-row space-x-4 w-full p-4 overflow-x-auto scrollbar-hide' : 'max-w-7xl w-full mx-auto px-4 h-14'}`}>
        <NavigationMenuItem>
          <Link to="/">
            <NavigationMenuLink 
              className={`${navigationMenuTriggerStyle()} 
                ${isActive('/') ? 'bg-purple-100 text-purple-800' : ''}
                hover:bg-[#F1F0FB] transition-colors duration-200 ease-in-out
                ${isMobile ? 'justify-center' : ''}`}
            >
              <Home className="mr-2 h-4 w-4" />
              Унэр
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/poems">
            <NavigationMenuLink 
              className={`${navigationMenuTriggerStyle()} 
                ${isActive('/poems') ? 'bg-purple-100 text-purple-800' : ''}
                hover:bg-[#F1F0FB] transition-colors duration-200 ease-in-out
                ${isMobile ? 'justify-center' : ''}`}
            >
              <Book className="mr-2 h-4 w-4" />
              Усэхэр
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/authors">
            <NavigationMenuLink 
              className={`${navigationMenuTriggerStyle()} 
                ${isActive('/authors') ? 'bg-purple-100 text-purple-800' : ''}
                hover:bg-[#F1F0FB] transition-colors duration-200 ease-in-out
                ${isMobile ? 'justify-center' : ''}`}
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
