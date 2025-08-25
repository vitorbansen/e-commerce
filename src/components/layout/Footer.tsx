'use client'

import React from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-blue-600 text-white px-3 py-2 rounded-lg font-bold text-lg">
                Top Promo Br
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Sua loja online de confiança com os melhores produtos e promoções. 
              Oferecemos qualidade, variedade e preços competitivos para toda a família.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link 
                  href="/products" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Produtos
                </Link>
              </li>
              <li>
                <Link 
                  href="/categories" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Categorias
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <span className="text-gray-300">contato@toppromo.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <span className="text-gray-300">(11) 9999-9999</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span className="text-gray-300">São Paulo, SP - Brasil</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha de Separação */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Top Promo Br. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link 
                href="/privacy" 
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Política de Privacidade
              </Link>
              <Link 
                href="/terms" 
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

