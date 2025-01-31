'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Bell, Menu, X, Sun, Moon, User, Settings, LogOut, Home, DollarSign, AlertCircle, Check } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import SignIn from "@/app/signin/page"
import { cn } from "@/lib/utils"

const initialNotifications = [
  {
    id: 1,
    title: 'Novo Imóvel Disponível',
    description: 'Um novo imóvel que corresponde aos seus critérios foi adicionado.',
    time: '5 minutos atrás',
    icon: Home,
    type: 'info',
    read: false
  },
  {
    id: 2,
    title: 'Pagamento Agendado',
    description: 'Seu pagamento de aluguel está agendado para amanhã.',
    time: '2 horas atrás',
    icon: DollarSign,
    type: 'warning',
    read: false
  },
  {
    id: 3,
    title: 'Atualização de Documentos',
    description: 'Por favor, atualize seus documentos para continuar o processo.',
    time: '1 dia atrás',
    icon: AlertCircle,
    type: 'alert',
    read: true
  }
]

const navigation = [
  {
    label: "Início",
    path: "/",
  },
  {
    label: "Imóveis",
    path: "/imoveis",
  },
  {
    label: "Comprar",
    path: "/comprar",
  },
  {
    label: "Landing Page",
    path: "/landing",
  },
  {
    label: "Financeiro",
    path: "/financeiro",
  },
  {
    label: "Dashboard",
    path: "/dashboard",
  },
]

export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [notifications, setNotifications] = useState(initialNotifications)
  const { setTheme, theme } = useTheme()
  const isHome = pathname === '/' || pathname === '/landing'

  // Fechar dropdowns quando mudar de rota
  useEffect(() => {
    setIsNotificationsOpen(false)
    setIsUserMenuOpen(false)
    setIsMenuOpen(false)
  }, [pathname])

  const unreadCount = notifications.filter(n => !n.read).length

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })))
  }

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ))
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-20 ${isHome ? 'bg-black/30 backdrop-blur-[4px]' : 'bg-white border-b'}`}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between border-0">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-green-500">
          Tratto
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {navigation.map((nav) => (
            <div key={nav.path} className={cn(
              "px-2",
              pathname === nav.path && (isHome ? "border-b border-white" : "border-b border-green-500")
            )}>
              <Link 
                href={nav.path} 
                className={cn(
                  "text-sm font-semibold leading-6 hover:text-green-500 transition-colors",
                  pathname === nav.path && "font-bold",
                  isHome ? "text-white" : "text-gray-900"
                )}
              >
                {nav.label}
              </Link>
            </div>
          ))}
        </nav>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4">
          <SignIn />
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`${isHome ? 'text-white' : 'text-gray-700'} hover:text-primary transition-colors`}
          >
            {theme === 'dark' ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </button>
          <div className="relative top-1">
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className={`${isHome ? 'text-white' : 'text-gray-700'} hover:text-primary transition-colors relative`}
            >
              <Bell className="size-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[14px] h-[14px] text-[8px] font-medium bg-red-500 text-white rounded-full px-1">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Drawer */}
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-[25rem] py-2 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">Notificações</h3>
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-600 rounded-full">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button 
                      onClick={markAllAsRead}
                      className="text-sm text-primary hover:text-primary/90"
                    >
                      Marcar todas como lidas
                    </button>
                  )}
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                  {notifications.map((notification) => {
                    const Icon = notification.icon
                    return (
                      <div 
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-0 ${!notification.read ? 'bg-blue-50/50' : ''}`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex gap-3">
                          <div className={`
                            size-8 rounded-full flex items-center justify-center
                            ${notification.type === 'info' ? 'bg-blue-100 text-blue-600' : ''}
                            ${notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600' : ''}
                            ${notification.type === 'alert' ? 'bg-red-100 text-red-600' : ''}
                          `}>
                            <Icon className="size-4" />
                          </div>
                          <div className="flex-1">
                            <h4 className={`text-sm ${!notification.read ? 'font-semibold' : 'font-medium'} text-gray-900`}>
                              {notification.title}
                            </h4>
                            <p className="text-sm text-gray-600">{notification.description}</p>
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="px-4 py-2 border-t border-gray-100">
                  <button className="w-full text-sm text-primary hover:text-primary/90">
                    Ver todas as notificações
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <button 
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="w-8 h-8 rounded-full overflow-hidden relative hover:ring-2 hover:ring-primary hover:ring-offset-2 transition-all"
            >
              <Image
                src="https://avatars.githubusercontent.com/u/124599?v=4"
                alt="Avatar"
                fill
                className="object-cover"
              />
            </button>

            {/* User Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-lg shadow-sm border border-gray-100">
                <button className="w-full px-4 py-2 flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50">
                  <User className="size-4" />
                  Meu Perfil
                </button>
                <button className="w-full px-4 py-2 flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50">
                  <Settings className="size-4" />
                  Configurações
                </button>
                <div className="my-1 border-t border-gray-100" />
                <button className="w-full px-4 py-2 flex items-center gap-2 text-sm text-red-600 hover:bg-gray-50">
                  <LogOut className="size-4" />
                  Sair
                </button>
              </div>
            )}
          </div>
          <button 
            className={`md:hidden ${isHome ? 'text-white' : 'text-gray-700'} hover:text-primary transition-colors`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white border-b md:hidden">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navigation.map((nav) => (
                <Link 
                  key={nav.path} 
                  href={nav.path} 
                  className={cn(
                    "text-sm font-semibold leading-6 hover:text-green-500 transition-colors",
                    pathname === nav.path && "font-bold",
                    isHome ? "text-white" : "text-gray-900"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {nav.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
