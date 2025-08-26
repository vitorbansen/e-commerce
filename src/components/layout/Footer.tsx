'use client'

import React from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Star, Heart, ShoppingBag } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo e Descrição */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="inline-flex items-center mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl font-black text-2xl shadow-lg">
                  Top Promo Br
                </div>
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
                Sua loja online de confiança com os melhores produtos e promoções. 
                Oferecemos qualidade excepcional, variedade única e preços que cabem no seu bolso.
              </p>
              
              {/* Stats Mini */}
              <div className="grid grid-cols-3 gap-6 mb-8 max-w-md">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">50K+</div>
                  <div className="text-gray-400 text-xs">Clientes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">10K+</div>
                  <div className="text-gray-400 text-xs">Produtos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">99%</div>
                  <div className="text-gray-400 text-xs">Satisfação</div>
                </div>
              </div>
            </div>
            
            {/* Social Media */}
            <div>
              <h4 className="text-white font-semibold mb-4">Siga-nos nas redes sociais</h4>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 transition-all duration-300 group"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                </a>
                <a 
                  href="#" 
                  className="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-600 transition-all duration-300 group"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                </a>
                <a 
                  href="#" 
                  className="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-500 transition-all duration-300 group"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                <ShoppingBag className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Navegação</h3>
            </div>
            
            <ul className="space-y-4">
              {[
                { href: '/', label: 'Início' },
                { href: '/products', label: 'Produtos' },
                { href: '/categories', label: 'Categorias' },
                { href: '/about', label: 'Sobre Nós' },
                { href: '/contact', label: 'Contato' }
              ].map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group"
                  >
                    <div className="w-2 h-2 bg-gray-600 rounded-full mr-3 group-hover:bg-blue-400 transition-colors duration-300"></div>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                <Mail className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Contato</h3>
            </div>
            
            <ul className="space-y-6">
              <li>
                <div className="flex items-start space-x-4 group">
                  <div className="w-10 h-10 bg-gray-800 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition-colors duration-300">
                    <Mail className="h-5 w-5 text-gray-400 group-hover:text-white" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">E-mail</div>
                    <a href="mailto:contato@toppromo.com" className="text-white hover:text-blue-400 transition-colors duration-300 font-medium">
                      contato@toppromo.com
                    </a>
                  </div>
                </div>
              </li>
              
              <li>
                <div className="flex items-start space-x-4 group">
                  <div className="w-10 h-10 bg-gray-800 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-600 transition-colors duration-300">
                    <Phone className="h-5 w-5 text-gray-400 group-hover:text-white" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Telefone</div>
                    <a href="tel:+5511999999999" className="text-white hover:text-green-400 transition-colors duration-300 font-medium">
                      (11) 9999-9999
                    </a>
                  </div>
                </div>
              </li>
              
              <li>
                <div className="flex items-start space-x-4 group">
                  <div className="w-10 h-10 bg-gray-800 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-purple-600 transition-colors duration-300">
                    <MapPin className="h-5 w-5 text-gray-400 group-hover:text-white" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Localização</div>
                    <span className="text-white font-medium">São Paulo, SP - Brasil</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-red-500" />
              <p className="text-gray-400">
                © 2025 Top Promo Br. Feito com amor para você.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-8">
              <div className="flex space-x-6">
                <Link 
                  href="/privacy" 
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300 hover:underline"
                >
                  Política de Privacidade
                </Link>
                <Link 
                  href="/terms" 
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300 hover:underline"
                >
                  Termos de Uso
                </Link>
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Star className="h-4 w-4 text-yellow-400" />
                <span>Loja online de confiança desde 2020</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}