import Image from 'next/image';
import React from 'react';
import Logo from '../../assets/solucoesLogo.png'

function NavBar() {
    return (
        <nav className="bg-blue-500 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center max-w-[1450px]">
                <Image className='rounded-2xl' alt='Soluções Para Você' width={300} src={Logo}/>
                <div className="text-white font-bold text-lg">Pesquisar</div>
                <ul className="flex space-x-4">
                    <li>
                        <a href="/" className="text-white hover:text-blue-200">Serviços</a>
                    </li>
                    <li>
                        <a href="/about" className="text-white hover:text-blue-200">Entrar</a>
                    </li>
                    <li>
                        <a href="/services" className="text-white hover:text-blue-200">Contato</a>
                    </li>
                    <li>
                        <a href="/contact" className="text-white hover:text-blue-200">Carrinho</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;
