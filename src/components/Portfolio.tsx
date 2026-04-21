import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import NotionContent from './NotionContent';

const defaultCategories = ['Todos', 'Robótica', 'Circuitos', 'Control'];

const defaultProjects: { id: number; title: string; category: string; image: string; notionData?: any }[] = [
  { id: 1, title: 'Brazo Robótico 4 DOF', category: 'Robótica', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop' },
  { id: 2, title: 'Fuente de Poder Regulada', category: 'Circuitos', image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=2069&auto=format&fit=crop' },
  { id: 3, title: 'Control de Temperatura PID', category: 'Control', image: 'https://images.unsplash.com/photo-1581092335397-9583ee92d03b?q=80&w=2070&auto=format&fit=crop' },
  { id: 4, title: 'Robot Seguidor de Línea', category: 'Robótica', image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd05a?q=80&w=2010&auto=format&fit=crop' },
  { id: 5, title: 'Amplificador de Audio', category: 'Circuitos', image: 'https://images.unsplash.com/photo-1558522195-e1201b090344?q=80&w=2070&auto=format&fit=crop' },
  { id: 6, title: 'Sistema de Riego Automático', category: 'Control', image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=1974&auto=format&fit=crop' },
];

export default function Portfolio({ data }: { data?: any[] }) {
  const [activeCategory, setActiveCategory] = useState('Todos');

  // If we have Notion projects, use them
  const isNotion = data && data.length > 0;
  
  const projects = isNotion 
    ? data.map((p, i) => {
        // Buscamos primero la PORTADA de la página (la que configuramos en server.ts)
        // Si no existe, buscamos la última imagen en los bloques (por si acaso)
        const notionImages = p.data?.filter((block: any) => block.type === 'image') || [];
        const lastNotionImage = notionImages.length > 0 ? notionImages[notionImages.length - 1].url : null;
        
        const finalImage = p.cover || lastNotionImage;

        // Imágenes personalizadas locales de respaldo
        const customImages = ['/proyecto-1.jpg', '/proyecto-2.jpg', '/proyecto-3.jpg'];
        return {
          id: p.id,
          title: p.title,
          category: 'Destacados',
          image: finalImage || customImages[i] || `https://images.unsplash.com/photo-${1500000000000 + i * 1000000}?q=80&w=800&auto=format&fit=crop`,
          notionData: p.data
        };
      })
    : defaultProjects;

  const categories = isNotion ? ['Todos', 'Destacados'] : defaultCategories;

  const filteredProjects = activeCategory === 'Todos' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold uppercase tracking-widest mb-4"
          >
            Proyectos
          </motion.h2>
          
          <Tabs defaultValue="Todos" className="w-full" onValueChange={setActiveCategory}>
            <TabsList className="bg-transparent h-auto p-0 flex-wrap justify-start gap-6 mb-12">
              {categories.map((cat) => (
                <TabsTrigger 
                  key={cat} 
                  value={cat}
                  className="px-0 py-2 text-sm font-bold uppercase tracking-wider data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none bg-transparent shadow-none"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative aspect-square block w-full h-full"
              >
                <Dialog>
                  <DialogTrigger 
                    render={<button className="w-full h-full overflow-hidden bg-white shadow-md cursor-pointer relative group block text-left bg-transparent p-0 border-none m-0 focus:outline-none" />}
                  >
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-6">
                      <h3 className="text-xl text-center font-bold uppercase tracking-wider mb-2">{project.title}</h3>
                      <p className="text-sm font-light opacity-80">{project.category}</p>
                    </div>
                  </DialogTrigger>
                  
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                     <DialogTitle className="text-3xl font-bold uppercase tracking-widest mb-2 mt-4">{project.title}</DialogTitle>
                     <DialogDescription className="sr-only">Detalles del proyecto {project.title}</DialogDescription>
                     {isNotion ? (
                        <div className="mt-8">
                          <NotionContent blocks={project.notionData} />
                        </div>
                     ) : (
                        <div className="mt-8 text-gray-600">
                          <img src={project.image} alt={project.title} className="w-full h-64 object-cover mb-4" />
                          <p>Descripción detallada del proyecto {project.title}. Aquí podrías mostrar la galería de imágenes o la explicación técnica.</p>
                        </div>
                     )}
                  </DialogContent>
                </Dialog>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
