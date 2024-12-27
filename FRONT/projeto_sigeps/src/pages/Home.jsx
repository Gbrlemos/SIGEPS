import React from 'react';

const Home = () => {
  return (
    <div className="container">
      <h1>Bem-vindo ao SIGEPS!</h1>
      
      <section>
        <p>
          O <strong>SIGEPS</strong> foi criado para facilitar o atendimento das suas demandas de teste, implantação e manutenção de sistemas digitais.
          Se você adquiriu um de nossos sistemas, o SIGEPS é a plataforma onde você pode abrir chamados para solucionar qualquer questão relacionada a esses sistemas.
        </p>
        <p>
          Através do SIGEPS, você poderá:
          <ul>
            <li>Abrir chamados para suas demandas, seja de teste, implantação ou manutenção;</li>
            <li>Acompanhar o status do seu chamado em tempo real;</li>
            <li>Ter acesso direto aos especialistas que vão trabalhar na solução da sua solicitação.</li>
          </ul>
        </p>
        <p>Nosso objetivo é oferecer o melhor suporte possível, garantindo que sua experiência com os sistemas que você adquiriu conosco seja sempre positiva. Se precisar de ajuda, estamos à disposição!</p>
      </section>
    </div>
  );
};

export default Home;
