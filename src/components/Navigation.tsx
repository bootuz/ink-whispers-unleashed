
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { Link, useLocation } from "react-router-dom"
import { Home, Book, Users, Menu } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import * as React from "react"

export const Navigation = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const isActive = (path: string) => location.pathname === path;

  // Close drawer when navigation item clicked (mobile)
  const handleMobileNavClick = () => {
    if (isMobile) setDrawerOpen(false);
  };

  const NavigationContent = () => (
    <NavigationMenuList className={`${isMobile ? 'flex-col space-y-2 w-full p-4' : 'max-w-7xl w-full mx-auto px-4 h-14'}`}>
      <NavigationMenuItem className={isMobile ? 'w-full' : ''}>
        <Link
          to="/"
          className={isMobile ? 'w-full block' : ''}
          onClick={handleMobileNavClick}
        >
          <NavigationMenuLink 
            className={`${navigationMenuTriggerStyle()} 
              ${isActive('/') ? 'bg-purple-100 text-purple-800' : ''}
              hover:bg-[#F1F0FB] transition-colors duration-200 ease-in-out
              ${isMobile ? 'w-full justify-start' : ''}`}
          >
            <Home className="mr-2 h-4 w-4" />
            Унэр
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem className={isMobile ? 'w-full' : ''}>
        <Link
          to="/poems"
          className={isMobile ? 'w-full block' : ''}
          onClick={handleMobileNavClick}
        >
          <NavigationMenuLink 
            className={`${navigationMenuTriggerStyle()} 
              ${isActive('/poems') ? 'bg-purple-100 text-purple-800' : ''}
              hover:bg-[#F1F0FB] transition-colors duration-200 ease-in-out
              ${isMobile ? 'w-full justify-start' : ''}`}
          >
            <Book className="mr-2 h-4 w-4" />
            Усэхэр
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem className={isMobile ? 'w-full' : ''}>
        <Link
          to="/authors"
          className={isMobile ? 'w-full block' : ''}
          onClick={handleMobileNavClick}
        >
          <NavigationMenuLink 
            className={`${navigationMenuTriggerStyle()} 
              ${isActive('/authors') ? 'bg-purple-100 text-purple-800' : ''}
              hover:bg-[#F1F0FB] transition-colors duration-200 ease-in-out
              ${isMobile ? 'w-full justify-start' : ''}`}
          >
            <Users className="mr-2 h-4 w-4" />
            УсакIуэхэр
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    </NavigationMenuList>
  );

  return (
    <NavigationMenu className="max-w-full w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 z-50 border-b">
      {isMobile ? (
        <div className="w-full px-4 py-2 flex items-center">
          <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon" onClick={() => setDrawerOpen(true)}>
                <Menu className="h-6 w-6" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <NavigationContent />
              <DrawerClose asChild>
                {/* Invisible button to allow closing with esc or click out, no visible UI here */}
                <button className="hidden" aria-hidden="true" tabIndex={-1}></button>
              </DrawerClose>
            </DrawerContent>
          </Drawer>
          <span className="mx-auto font-medium">Усэрадэ</span>
        </div>
      ) : (
        <NavigationContent />
      )}
    </NavigationMenu>
  )
}
