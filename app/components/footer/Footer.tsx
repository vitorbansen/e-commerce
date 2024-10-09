import Link from "next/link";


function Footer() {
    return (<div>
        {/* const categories = [
        { id: 1, name: "Categoria 1" },
        { id: 2, name: "Categoria 2" },
        { id: 3, name: "Categoria 3" },
    ]; */}
        <footer className="py-8 bg-blue-500 text-center shadow-md">
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="flex flex-col sm:flex-row justify-between mb-6">
                    <div className="flex-1 mb-4">
                        <h3 className="text-lg font-semibold text-white">Departamentos</h3>
                        <div className="flex flex-col space-y-2">
                            {/* {categories.map(category => (
                                <Link key={category.id} href={`/categories/${category.id}`} className="text-white hover:underline">
                                    {category.name}
                                </Link>
                            ))} */}
                        </div>
                    </div>
                    <div className="flex-1 mb-4">
                        <h3 className="text-lg font-semibold text-white">Institucional</h3>
                        <ul className="list-none space-y-2">
                            <li><Link href="" className="text-white hover:underline">Sobre Nós</Link></li>
                            <li><Link href="" className="text-white hover:underline">Políticas do Site</Link></li>
                            <li><Link href="" className="text-white hover:underline">Política de Privacidade</Link></li>
                            <li><Link href="" className="text-white hover:underline">Trabalhe Conosco</Link></li>
                        </ul>
                    </div>
                    <div className="flex-1 mb-4 text-white">
                        <h3 className="text-lg font-semibold">Atendimento</h3>
                        <ul className="list-none space-y-2">
                            <li>Horário: 08:00 às 19:00</li>
                            <li>Segunda a Sexta</li>
                            <li>Rua Maringa, 97</li>
                            <li>Telefone: (47) 98813-5268</li>
                        </ul>
                    </div>

                </div>
                <div className="border-t border-wtext-white pt-4">
                    <p className="text-white">&copy; 2024 Soluções Para Você. Todos os direitos reservados.</p>
                    <Link href="/privacyPolicy" className="text-white hover:underline">Política de Privacidade</Link>
                    <span className="ml-4">
                        <Link href="https://github.com/vitorbansen" target="_blank" className="font-semibold text-white hover:underline">
                            Desenvolvido por <span className="text-white">Vitor Bansen</span>
                        </Link>
                    </span>
                </div>
            </div>
        </footer>
    </div>);
}

export default Footer;


