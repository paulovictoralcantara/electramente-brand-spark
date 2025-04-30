
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ArrowRight } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Insira um email válido"),
  niche: z.string().min(2, "Nicho deve ter pelo menos 2 caracteres"),
});

type FormValues = z.infer<typeof formSchema>;

const Index = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      niche: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "YOUR-WEB3FORMS-ACCESS-KEY", // Replace with your Web3Forms access key
          from_name: "ElectraMente Lead Form",
          subject: "Novo lead do ElectraMente",
          email_to: "contato@somoselectra.com.br",
          ...data,
        }),
      });
      
      const result = await response.json();
      if (result.success) {
        toast({
          title: "Formulário enviado com sucesso!",
          description: "Você será redirecionado em instantes.",
        });
        setTimeout(() => {
          window.location.href = "https://electramente.automacoesia.click/";
        }, 2000);
      } else {
        toast({
          title: "Erro ao enviar formulário",
          description: "Por favor, tente novamente.",
          variant: "destructive",
        });
        setIsSubmitting(false);
      }
    } catch (error) {
      toast({
        title: "Erro ao enviar formulário",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="w-full bg-white py-4 px-6 md:px-10 shadow-sm">
        <div className="container mx-auto flex justify-center md:justify-start">
          <img 
            src="/logo-electramente.png" 
            alt="ElectraMente" 
            className="h-10 md:h-12"
          />
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="py-12 md:py-20 bg-white text-foreground">
          <div className="container mx-auto px-6 md:px-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 animate-fade-in">
                <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                  <span className="text-primary">Diagnóstico Gratuito</span> de Posicionamento Estratégico da sua Marca Pessoal
                </h1>
                <p className="text-lg md:text-xl mb-8 text-muted-foreground">
                  Descubra como sua marca pessoal está posicionada no mercado e receba insights estratégicos para destacar-se da concorrência e atrair mais clientes ideais.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary rounded-full p-2">
                      <ArrowRight className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <p className="font-medium">Análise Personalizada</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary rounded-full p-2">
                      <ArrowRight className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <p className="font-medium">Estratégia Individualizada</p>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="bg-white p-8 rounded-xl border border-secondary/80 shadow-lg animate-scale-in">
                  <h2 className="text-2xl font-bold mb-6 text-center">
                    <span className="text-primary">Garanta</span> seu diagnóstico gratuito
                  </h2>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome completo</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Digite seu nome" 
                                className="bg-secondary/20 border-secondary" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Digite seu melhor email" 
                                type="email" 
                                className="bg-secondary/20 border-secondary" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="niche"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Seu nicho de atuação</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Ex: Coach, Mentor, Consultor" 
                                className="bg-secondary/20 border-secondary" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-bold py-3"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Enviando..." : "Quero meu diagnóstico gratuito"}
                      </Button>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-6 md:px-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
              Por que fazer seu <span className="text-primary">diagnóstico estratégico</span>?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md hover-scale">
                <div className="bg-primary rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Identificação de Oportunidades</h3>
                <p className="text-muted-foreground">
                  Descubra lacunas inexploradas no mercado onde sua marca pode se destacar e criar impacto significativo.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md hover-scale">
                <div className="bg-primary rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Diferenciação Competitiva</h3>
                <p className="text-muted-foreground">
                  Compreenda o que torna sua marca única e como comunicar efetivamente esses diferenciais para seu público-alvo.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md hover-scale">
                <div className="bg-primary rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Alinhamento Estratégico</h3>
                <p className="text-muted-foreground">
                  Alinhe sua visão, missão e valores com suas estratégias de comunicação e ofertas para maior consistência e autenticidade.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <div className="container mx-auto px-6 md:px-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pronto para transformar sua marca pessoal?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Não perca a oportunidade de receber um diagnóstico personalizado que vai impulsionar sua presença no mercado e atrair mais clientes ideais.
            </p>
            <Button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-foreground hover:bg-foreground/80 text-background px-8 py-3 text-lg font-semibold"
            >
              Quero meu diagnóstico gratuito
            </Button>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-white text-foreground border-t border-secondary py-8">
        <div className="container mx-auto px-6 md:px-10 text-center">
          <img 
            src="/logo-electramente.png" 
            alt="ElectraMente" 
            className="h-8 mx-auto mb-4"
          />
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} ElectraMente. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
