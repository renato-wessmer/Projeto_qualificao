/**
 * @file DistritosScreen.jsx
 * @author Renato Wessner dos Santos
 * @date 2025-10-24
 * @project SOS Libras - Sistema de Emergência em Libras
 * @copyright (c) 2025 Renato Wessner dos Santos
 */

import { useNavigate } from 'react-router-dom';

const DistritosScreen = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/info');
  };

  const distritos = [
    { unidade: '1º DP', horario: 'segunda-feira a sexta-feira 08:00–20:00', endereco: 'Rua da Glória, 410 – Liberdade', telefone: '(11) 3341-3840' },
    { unidade: '1ª DDM', horario: '24h', endereco: 'Casa Da Mulher Brasileira - Rua Vieira Ravasco, 26 - Cambuci', telefone: '(11) 3275-8000' },
    { unidade: '1ª Delegacia Seccional o Distrito de nº 78 – Jardins', horario: '24h', endereco: 'Rua Estados Unidos, 1.608 – Jardim América – São Paulo/SP', telefone: '(11) 3081-6682 e 3082-0160' },
    { unidade: '2º DP', horario: '24h', endereco: 'Rua Jaraguá, 383 – Bom Retiro', telefone: '(11) 3221-6943' },
    { unidade: '2ª DDM', horario: '24h', endereco: 'Avenida Onze De Junho, 89 - Vila Clementino', telefone: '(11) 5084-2579' },
    { unidade: '3º DP', horario: 'segunda-feira a sexta-feira 08:00–20:00', endereco: 'Rua Aurora, 322 – Santa Efigênia', telefone: '(11) 3223-9839' },
    { unidade: '3ª DDM', horario: 'segunda-feira a sexta-feira 09:00–18:00', endereco: 'Avenida Corifeu De Azevedo Marques, 4300 - Jaguaré', telefone: '(11) 3714-1137' },
    { unidade: '4º DP', horario: 'segunda-feira a sexta-feira 09:00–19:00', endereco: 'Rua Marquês de Paranaguá, 246 – Consolação', telefone: '(11) 3256-4148' },
    { unidade: '4ª DDM', horario: '24h', endereco: 'Avenida Itaberaba, 731 - Freguesia Do Ó', telefone: '(11) 3976-2908' },
    { unidade: '5º DP', horario: 'segunda-feira a sexta-feira 08:00–20:00', endereco: 'Rua Prof. Antonio Prudente, 160 – Liberdade', telefone: '(11) 3208-038O' },
    { unidade: '5ª DDM', horario: '24h', endereco: 'Rua Corinto Balduíno Costa, 400', telefone: '(11) 2293-3816' },
    { unidade: '6º DP', horario: 'segunda-feira a sexta-feira 08:00–20:00', endereco: 'Rua Hermínio Lemos, 70 – Cambuci', telefone: '(11) 3208-6109' },
    { unidade: '6ª DDM', horario: '24 horas', endereco: 'Rua Padre José De Anchieta, 138.', telefone: '(11) 5687-4004' },
    { unidade: '7º DP', horario: '24h', endereco: 'Rua Camilo, 317 – Vila Romana', telefone: '(11) 3864-7445' },
    { unidade: '7ª DDM', horario: '24h', endereco: "Rua Sábado D'Ângelo, 46 - Itaquera", telefone: '(11) 2071-3488' },
    { unidade: '8º DP', horario: '24h', endereco: 'Rua Sapucaia, 206 – Brás', telefone: '(11) 2291–9474' },
    { unidade: '8ª DDM', horario: '24h', endereco: 'Rua Otávio Alves Dundas, 390, Vila Ema - São Paulo', telefone: '(11) 2742-1701' },
    { unidade: '9º DP', horario: 'segunda-feira a sexta-feira 08:00–20:00', endereco: 'Rua dos Camarés, 94 – Carandiru', telefone: '(11) 2909 9860' },
    { unidade: '9ª DDM', horario: 'segunda-feira a sexta-feira 09:00–18:00', endereco: 'Avenida Menotti Laudisio, 286 - Pirituba.', telefone: '(11) 3974-8890' },
    { unidade: '10º DP', horario: '24h', endereco: 'Av. Airton Pretinin, 69 – Penha', telefone: '(11) 6198–6010' },
    { unidade: '11º DP', horario: '24h', endereco: 'Rua Padre José de Anchieta, 138 – Santo Amaro', telefone: '(11) 5686–9931' },
    { unidade: '12º DP', horario: 'segunda-feira a sexta-feira 08:00–20:00', endereco: 'Rua Rio Bonito, 950 – Brás', telefone: '(11) 2292-3537' },
    { unidade: '13º DP', horario: '24h', endereco: 'Av. Casa Verde, 677 – Casa Verde', telefone: '(11) 3966–1190' },
    { unidade: '14º DP', horario: '24h', endereco: 'Rua Deputado Lacerda Franco, 372 – Pinheiros', telefone: '(11) 3032-1100' },
    { unidade: '15º DP', horario: 'segunda-feira a sexta-feira 08:00–20:00', endereco: 'Rua Renato Paes de Barros, 340 –Itaim Bibi', telefone: '(11) 3079-8244' },
    { unidade: '16º DP', horario: '24h', endereco: 'Av. Onze de Junho, 89 – Vila Clementino', telefone: '(11) 5573–0363' },
    { unidade: '17º DP', horario: 'segunda-feira a sexta-feira 09:30–17:00', endereco: 'Rua Dom Luiz Lazagna, 534 – Ipiranga', telefone: '(11) 2061–2062' },
    { unidade: '18º DP', horario: 'segunda-feira a sexta-feira 08:00–20:00', endereco: 'Rua Juventus, 350 – Alto da Mooca', telefone: '(11) 2273–5751' },
    { unidade: '19º DP', horario: 'segunda-feira a sexta-feira 08:00–20:00', endereco: 'Rua Amambai, 1181 – Vila Maria', telefone: '(11) 2954–2868' },
    { unidade: '20º DP', horario: 'segunda-feira a sexta-feira 09:00–19:55', endereco: 'Rua São Zeferino, 34 – Jardim França', telefone: '(11) 2203–8801' },
    { unidade: '21º DP', horario: 'segunda-feira a sexta-feira 08:00–20:00', endereco: 'Av. Marcondes de Brito, 1416 – Chácara Seis de Outubro', telefone: '(11) 2651–9979' },
    { unidade: '22º DP', horario: 'segunda-feira a sexta-feira 08:00–20:00', endereco: 'Rua Américo Gomes da Costa, 305 – Vila Americana', telefone: '(11) 2297–0458' },
    { unidade: '23º DP', horario: 'segunda-feira a sexta-feira 08:00–20:00', endereco: 'Rua Itapecuru, 80 – Perdizes', telefone: '(11) 3864–5265' },
    { unidade: '24º DP', horario: '24h', endereco: 'Av. São Miguel, 3551 – Ponte Rasa', telefone: '(11) 2546–4132' },
    { unidade: '25º DP', horario: 'segunda-feira a sexta-feira 08:00–20:00', endereco: 'Rua Humberto Ravello, 9 – Parelheiros', telefone: '(11) 5920–8959' },
    { unidade: '26º DP', horario: '24h', endereco: 'Av. Padre Arlindo Vieira, 50 – Sacomã', telefone: '(11) 2946–0156' },
    { unidade: '27º DP', horario: '24h', endereco: 'Rua Demóstenes, 407 – Campo Belo', telefone: '(11) 5543–2727' },
    { unidade: '28º DP', horario: '-', endereco: 'Av. Itaberaba, 731 – Freguesia do Ó', telefone: '(11) 3976–3223' },
    { unidade: '30º DP', horario: '24h', endereco: 'Rua Antonio de Camardo, 69 – Tatuapé', telefone: '(11) 2295–0103' },
    { unidade: '31º DP', horario: '24h', endereco: 'Av. Conselheiro Carrão, 2580 – Vila Carrão', telefone: '(11) 2094–3033' },
    { unidade: '32º DP', horario: 'segunda-feira a sexta-feira 08:00–20:00', endereco: "Rua Sabbado D'Angelo, 64 – Itaquera", telefone: '(11) 2205–6015' },
    { unidade: '33º DP', horario: '24h', endereco: 'Rua Joaquim de Oliveira Freitas, 1170 – Pirituba', telefone: '(11) 3904–2345' },
    { unidade: '34º DP', horario: 'segunda-feira a sexta-feira 08:00–20:00', endereco: 'Av. Prof Francisco Morato, 2971 – Vila Sônia/Morumbi', telefone: '(11) 3742–0176' },
    { unidade: '35º DP', horario: 'segunda-feira a sexta-feira 09:00–17:00', endereco: 'Av. Engenheiro George Corbisier, 322 – Jabaquara', telefone: '(11) 5012–0763' },
    { unidade: '36º DP', horario: 'segunda-feira a sexta-feira 08:00–20:00', endereco: 'Rua Tutóia, 921 – Vila Mariana', telefone: '(11) 3884–4229' },
    { unidade: '37º DP', horario: 'segunda-feira a sexta-feira 08:00–20:00', endereco: 'Rua Jacaratanga, 201 – Campo Limpo', telefone: '(11) 5841–5744' },
    { unidade: '38º DP', horario: 'segunda-feira a sexta-feira 08:00–20:00', endereco: 'Rua Parada Pinto, 2387 – Vila Amália', telefone: '(11) 2232–2181' },
    { unidade: '39º DP', horario: 'segunda-feira a sexta-feira 08:00–20:00', endereco: 'Rua da Esperança, 797 – Vila Gustavo', telefone: '(11) 2989–6328' },
    { unidade: '40º DP', horario: 'segunda-feira a sexta-feira 08:00–20:00', endereco: 'Av. Deputado Emilio Carlos, 1251 – Vila Santa Maria', telefone: '(11) 3936–4929' },
    { unidade: '41º DP', horario: '-', endereco: 'Av. Inconfidência Mineira, 688 – Vila Rica', telefone: '(11) 2724–6200' },
    { unidade: '59º DP', horario: 'segunda-feira a sexta-feira 08:00–20:00', endereco: 'Rua Vistosa da Madre de Deus, 120 – Jardim Noêmia', telefone: '(11) 2581–3929' },
    { unidade: '62º DP', horario: 'segunda-feira a sexta-feira 08:00–20:00', endereco: 'Rua Ruy Pirozzelli, 250 – Ermelino Matarazzo', telefone: '(11) 2546–4961' },
    { unidade: '63º DP', horario: '24h', endereco: 'Rua Desdabrido, 50 – Vila Jacuí', telefone: '(11) 2051–9463' },
    { unidade: '64º DP', horario: 'segunda-feira a sexta-feira 08:00–20:00', endereco: 'Av. Água de Halia, Esqina com a Rua Sonho Gaúcho, s/n – Cidade A. E. Carvalho', telefone: '(11) 2280–4538' },
    { unidade: '65º DP', horario: 'segunda-feira a sexta-feira 08:00–20:00', endereco: 'Rua Estanislau de Campos, 750 – Artur Alvim', telefone: '(11) 2741–3891' },
    { unidade: '66º DP', horario: 'segunda-feira a sexta-feira 08:00–20:00', endereco: 'Av Osvaldo Vale Cordeiro, 190 – Jardim Aricanduva', telefone: '(11) 2742–2126' },
    { unidade: '67º DP', horario: 'segunda-feira a sexta-feira 08:00–20:00', endereco: 'Rua Severino Jose Fernandes, 1900 – Jardim Robru', telefone: '(11) 2035–1772' },
    { unidade: '68º DP', horario: 'segunda-feira a sexta-feira 08:00–20:00', endereco: 'Rua João da Silva Aguiar, 850 – Lageado', telefone: '(11) 2557–7966' },
    { unidade: '69º DP', horario: '24h', endereco: 'Av. Arquiteto Vila Nova Artigas, 720 – Teotônio Vilela', telefone: '(11) 2704–5085' },
    { unidade: '70º DP', horario: 'segunda-feira a sexta-feira 09:00–18:00', endereco: 'Rua Otavio Alves Dundas, 390 – Sapopemba', telefone: '(11) 2702–0454' },
    { unidade: '72º DP', horario: '24h', endereco: 'Rua Diógenes Campos Aires, 185 – Vila Penteado', telefone: '(11) 3851–3988' },
    { unidade: '73º DP', horario: '-', endereco: 'Rua Paulo Lincoln do Vale Pontin, 744 – Jaçanã', telefone: '(11) 2241–6974' },
    { unidade: '74º DP', horario: 'segunda-feira a sexta-feira 09:00–18:00', endereco: 'Av. Elisio Teixeira Leite, 7461 – Jaraguá', telefone: '(11) 3971–4824' },
    { unidade: '75º DP', horario: 'segunda-feira a sexta-feira 08:00–20:00', endereco: 'Rua Mario Ancona, 530 – Jardim Arpoardor', telefone: '(11) 3782–0879' },
    { unidade: '77º DP', horario: '24h', endereco: 'Alameda Glete, 827 – Santa Cecília', telefone: '(11) 3221–5860' },
    { unidade: '78º DP', horario: '24h', endereco: 'Rua Estados Unidos, 1608 – Jardins', telefone: '(11) 3082–0160' },
    { unidade: '80º DP', horario: 'segunda-feira a sexta-feira 08:00–20:00', endereco: 'Rua Leonel da Gama Beles, s/n – Vila Joaniza', telefone: '(11) 5621–7339' },
    { unidade: '81º DP', horario: 'segunda-feira a sexta-feira 08:00–20:00', endereco: 'Av. Celso Garcia, 2875 – Belém', telefone: '(11) 2693–9496' },
    { unidade: '83º DP', horario: '24h', endereco: 'Rua Ângelo Bertini, 82 – Parque Bristol', telefone: '(11) 2331–9581' },
    { unidade: '85º DP', horario: 'segunda-feira a sexta-feira 08:00–20:00', endereco: 'Rua DRua Juvenal Hudson Ferreira, s/n – Jardim Mirna', telefone: '(11) 5526–9955' },
    { unidade: '87º DP', horario: 'segunda-feira a sexta-feira 08:00–20:00', endereco: 'Av. Menotti Laudisio, 286 – Vila Pereira Barreto', telefone: '(11) 3974–8174' },
    { unidade: '89º DP', horario: '24h', endereco: 'Rua Domingos Simões, 21 – Portal do Morumbi', telefone: '(11) 3743–8431' },
    { unidade: '90º DP', horario: 'segunda-feira a sexta-feira 08:00–20:00', endereco: 'Alameda Terceiro Sargento Alcides de Oliveira, 52 – Parque Novo Mundo', telefone: '(11) 2201–2957' },
    { unidade: '91º DP', horario: '24h', endereco: 'Av. Dr Gastão Vidigal, 307 – CEAGESP', telefone: '(11) 3831–4916' },
    { unidade: '92º DP', horario: 'segunda-feira a sexta-feira 08:00–20:00', endereco: 'Rua Maria Benedita Rodrigues, 300 – Parque Santo Antonio', telefone: '(11) 5511–5665' },
    { unidade: '93º DP', horario: 'segunda-feira a sexta-feira 09:00–19:00', endereco: 'Av. Corifeu De Azevedo Marques, 4300 – Jaguaré', telefone: '(11) 3768–3717' },
    { unidade: '95º DP', horario: 'segunda-feira a sexta-feira 08:00–20:00', endereco: 'Rua Comandante Taylor, 1180 – Cohab Heliópolis', telefone: '(11) 2215–8534' },
    { unidade: '96º DP', horario: 'segunda-feira a sexta-feira 08:00–20:00', endereco: 'Av. Engenheiro Luiz Carlos Berrini, 900 – Brooklin', telefone: '(11) 5505–1607' },
    { unidade: '97º DP', horario: 'segunda-feira a sexta-feira 08:00–20:00', endereco: 'Rodovia dos Imigrantes, km 11,5 – Americanópolis', telefone: '(11) 5588–4841' },
    { unidade: '98º DP', horario: '24h', endereco: 'Av. Angelo Cristianini, 467 – Jardim Miriam', telefone: '(11) 5621–7319' },
    { unidade: '99º DP', horario: 'segunda-feira a sexta-feira 08:00–20:00', endereco: 'Rua Sargento Manoel Barbosa da Silva, 115 – Campo Grande', telefone: '(11) 5521–6653' },
    { unidade: '100º DP', horario: '24h', endereco: 'Rua José Carlos dos Santos Marques, 301 – Jardim Herculano', telefone: '(11) 5831–2380' },
    { unidade: '101º DP', horario: '24h', endereco: 'Rua Carolina Michaelis, 370 – Jardim das Imbuias', telefone: '(11) 5928–5952' },
    { unidade: '102º DP', horario: '24h', endereco: 'Av. Robert Kennedy, 1171 – Socorro', telefone: '(11) 5686–3594' },
    { unidade: '103º DP', horario: 'segunda-feira a sexta-feira 08:00–20:00', endereco: 'Av. Nagib Farah Maluf, 209 – Itaquera', telefone: '(11) 2521–6549' },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col p-6 py-12">
      {/* Título */}
      <h1 className="text-2xl font-bold text-blue-600 text-center mb-6">
        Distritos Policiais de São Paulo
      </h1>

      {/* Tabela */}
      <div className="flex-1 w-full max-w-6xl mx-auto overflow-x-auto mb-8">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border border-blue-600 p-3 text-left">Seccional / Unidade</th>
              <th className="border border-blue-600 p-3 text-left">Horário</th>
              <th className="border border-blue-600 p-3 text-left">Endereço</th>
              <th className="border border-blue-600 p-3 text-left">Telefone</th>
            </tr>
          </thead>
          <tbody>
            {distritos.map((distrito, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-300 p-3">{distrito.unidade}</td>
                <td className="border border-gray-300 p-3">{distrito.horario}</td>
                <td className="border border-gray-300 p-3">{distrito.endereco}</td>
                <td className="border border-gray-300 p-3">{distrito.telefone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Botão VOLTAR */}
      <button
        onClick={handleBack}
        className="w-full max-w-sm mx-auto bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium py-4 px-8 rounded-full transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <span>←</span>
        <span>VOLTAR</span>
      </button>
    </div>
  );
};

export default DistritosScreen;
