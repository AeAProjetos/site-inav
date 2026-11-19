/*
 * Arquivo do site anterior (WordPress), do pacote do Blog (KIM, 18/11/2026, arquivo_2017_2023.json).
 * Fica no repositório porque não muda mais. Por enquanto, só as notícias de 2020 a 2023 (decisão do
 * usuário, 19/11/2026): 42 das 88. Fora dessas, saiu a de 07/04/2022, que dá o nome de uma criança.
 * Se 2017 a 2019 voltarem, a de 26/08/2019 continua fora, porque menciona trabalho voluntário.
 * Dos textos saíram as sobras do WordPress e do Instagram (botões de galeria, embeds, código e
 * links soltos), as marcações de pessoas (ficam as de instituições) e as instruções de inscrição
 * de cursos já encerrados (decisões do usuário, 19/11/2026). Os endereços antigos das 88
 * redirecionam (301) para /blog#arquivo: veja src/lib/enderecos-antigos.ts.
 */
export type ItemDoArquivo = {
  /** Endereço antigo sem barras, usado como chave. */
  id: string;
  /** AAAA-MM-DD. */
  data: string;
  titulo: string;
  /** Vazio em algumas notícias antigas, que só tinham fotos ou vídeo. */
  texto: string;
};

export const arquivoDoBlog: ItemDoArquivo[] = [
  {
    id: "semana-da-crianca-2",
    data: "2023-10-17",
    titulo: "Semana da criança!",
    texto:
      "No sorriso de uma criança, perde-se a tristeza, porque onde elas se encontram a alegria toma lugar. Mirna Rosa",
  },
  {
    id: "semana-da-crianca",
    data: "2023-10-17",
    titulo: "Semana da criança!",
    texto:
      "O INAV, agradece a todos os parceiros e amigos que contribuíram para a realização desta semana de muita alegria e diversão. Ver o sorriso no rosto das crianças nos remete a nossa infância e nos dá a esperança de um futuro melhor. @instsabin",
  },
  {
    id: "atividades-em-comemoracao-ao-dia-da-independencia-do-brasil",
    data: "2023-09-11",
    titulo: "Atividades em comemoração ao dia da Independência do Brasil!",
    texto: "",
  },
  {
    id: "atividades-tematicas-da-semana-do-cerrado",
    data: "2023-09-11",
    titulo: "Atividades temáticas da Semana do Cerrado!",
    texto: "",
  },
  {
    id: "apresentacao-teatral",
    data: "2023-09-06",
    titulo: "Apresentação teatral!",
    texto: "Apresentação teatral Ninho das Artes – O Coelho e o casamento da Onça",
  },
  {
    id: "mocao-de-louvor",
    data: "2023-09-06",
    titulo: "Moção de Louvor!",
    texto:
      "No dia 31 de agosto nossa presidente recebeu da Deputada Paula Belmonte Moção de Louvor pelos relevantes serviços prestados às políticas públicas voltadas para a Primeira Infância no Distrito Federal",
  },
  {
    id: "piquenique-em-comemoracao-a-semana-do-brincar",
    data: "2023-08-25",
    titulo: "Piquenique em comemoração a “Semana do Brincar”!",
    texto: "",
  },
  {
    id: "passeio-ao-parque-ana-lidia",
    data: "2023-08-24",
    titulo: "Passeio ao Parque Ana Lídia!",
    texto: "",
  },
  {
    id: "xi-plenarinha-regional",
    data: "2023-08-16",
    titulo: "XI Plenarinha Regional!",
    texto:
      "XI Plenarinha Regional : “Identidade e Diversidade na Educação Infantil: sou assim e você, como é”?",
  },
  {
    id: "doacao",
    data: "2023-08-15",
    titulo: "Doação!",
    texto:
      "Em nome das crianças atendidas pelo Instituto Nair Valadares- INAV, queremos agradecer ao “Colégio Ideal ” pela doação de alimentos e parabenizá-los pela linda inciativa dos estudantes em nos ajudar . Esse apoio estimula o nosso compromisso contínuo com o nosso objetivo. “Mais do que a esperança do mundo, os jovens são a alegria da vida”. @idealbsb",
  },
  {
    id: "arraia-inav-2023",
    data: "2023-06-30",
    titulo: "Arraiá INAV 2023!",
    texto: "",
  },
  {
    id: "feliz-pascoa-2",
    data: "2023-04-10",
    titulo: "Feliz Páscoa!",
    texto:
      "Páscoa é época de celebrar o amor de Cristo, compartilhar doçuras e espalhar muita gentileza. O Instituto Nair Valadares – INAV, agradece à Casa Azul Felipe Augusto, juntamente com todos os parceiros e amigos que contribuíram para a realização de uma Páscoa mais feliz e deliciosa para os nossos pequeninos. Desejamos uma Páscoa tão doce, quanto o sorriso de cada criança.",
  },
  {
    id: "campanha-de-vacinacao-contra-a-gripe-influenza",
    data: "2023-04-10",
    titulo: "Campanha de vacinação contra a gripe influenza!",
    texto:
      "Na tarde de hoje 31/03/2023, foi iniciada a Campanha de Vacinação contra a gripe Influenza. O esforço envidado pela Comissão de Educação do CEPAS, Secretaria de Educação e Secretaria de Saúde trará resultados positivos às crianças, atendidas nas Instituições Parceiras, e também aos colaboradores, pois como sabemos aumentou bastante a demanda, ocasionada por infecções pulmonares, para atendimento nas UPA’s e Hospitais do DF 🤧🤒😷👨🏽‍⚕ . O INAV, assim como outras OSC’s parceiras, foi uma das Instituições que recebeu a equipe da Saúde para realizar a in loco a vacinação das crianças devidamente acompanhadas pelos pais/responsáveis.",
  },
  {
    id: "inav-tec-excel-basico",
    data: "2023-03-23",
    titulo: "INAV TEC – EXCEL BÁSICO",
    texto:
      "O INAV está em fase de seleção, de adolescentes de 12 a 17 anos, para curso de Excel básico.",
  },
  {
    id: "inav-tec",
    data: "2022-07-04",
    titulo: "INAV TEC",
    texto:
      "O INAV está em fase de seleção, de adolescentes de 12 a 17 anos, para curso de informática.",
  },
  {
    id: "arraia-inav-2022",
    data: "2022-06-17",
    titulo: "Arraiá INAV 2022",
    texto: "",
  },
  {
    id: "doacao-embaixada-de-israel",
    data: "2022-06-08",
    titulo: "Doação embaixada de Israel!",
    texto:
      "O INAV teve a honra de receber das mãos do embaixador do Estado de Israel no Brasil, o Senhor Daniel Zohar Zonshine e sua Esposa, a embaixatriz Senhora Liora Zonshine, a primeira colheita de alfaces hidropônicos da missão em Brasilia. A produção de vegetais é sustentável e utiliza-se de tecnologias agrícolas desenvolvidas em Israel e adubo orgânico produzido por um Biodigestor instalado na embaixada. A iniciativa celebra o Shavuot, a festa que comemora a primeira colheita do ano, e teve o apoio do Escritório de Assuntos Internacionais do GDF, representado por Ana Luisa Farias, Assessora Especial e Ananda Ribeiro, Assessora de Comunicação.",
  },
  {
    id: "19-de-abril-dia-dos-povos-indigenas",
    data: "2022-04-20",
    titulo: "19 de Abril – Dia dos Povos Indígenas!",
    texto: "",
  },
  {
    id: "feliz-pascoa",
    data: "2022-04-18",
    titulo: "Feliz Páscoa!",
    texto:
      "É gratificante ver a alegria estampada no rostinho das crianças. O INAV, agradece à GPS Foundation em parceria com Mesa Brasil- Sesc-DF, por meio da campanha ‘Páscoa para Todos’, pela doação de caixas de chocolate. Com a doação, foi possível realizar uma Páscoa mais feliz, divertida e deliciosa para as nossas crianças. Que cada chocolate esteja repleto de paz e amor para todos. Feliz Páscoa! @gpsfoundation @sescdf @mesabrasildf",
  },
  {
    id: "parceria",
    data: "2022-03-16",
    titulo: "Parceria!",
    texto:
      "O INAV sabe o quanto é importante cuidar da saúde das crianças e por isso, acaba de firmar mais uma parceria com os estudantes de Enfermagem do Centro Universitário UNIPROJEÇÃO. A Universidade possui uma equipe de acadêmicos de enfermagem sob a supervisão de enfermeira obstetra e valoriza a importância do crescimento e desenvolvimento das crianças, sobretudo nos primeiros anos de vida. O trabalho em parceria será executado com vistas à identificação, à orientação e à educação em Saúde para nossas crianças, com a realização de diversos tipos de atividades na área da enfermagem, tais como avaliação específica em puericultura; verificação da caderneta de imunização; oficinas estendidas aos pais e ao corpo docente; suporte de enfermagem em consultas de CD (crescimento e desenvolvimento); suporte de orientação e educação de Saúde da Família, conforme recomendações do Ministério da Saúde (MS) etc. Ao longo do projeto serão ainda executados diversos tipos de atividades voltadas para a saúde integral de nossas crianças. As flores de amanhã nascem das sementes de hoje (sabedoria oriental). @grupoprojecao @enfermagem_uniprojecao #educacaoinfantil #riachofundo2 #parceriasolidária #atendimentosaude #enfermagem",
  },
  {
    id: "amor-violencia-nao-campanha-contra-o-abuso-e-violencia-infantil",
    data: "2021-04-26",
    titulo: "+ Amor, violência não. Campanha contra o abuso e violência infantil.",
    texto: "",
  },
  {
    id: "juntos-contra-a-covid-doe-amor-doe-mascaras",
    data: "2021-04-12",
    titulo: "Juntos Contra a Covid. Doe Amor Doe Máscaras.",
    texto: "",
  },
  {
    id: "agradecimento",
    data: "2021-04-06",
    titulo: "Agradecimento!",
    texto:
      "O INAV sabe o quanto uma doação pode fazer a diferença na vida das crianças. Gostaríamos de aproveitar a oportunidade para transmitir nossos sinceros agradecimentos pela sua gentil contribuição que nos possibilitou levar um pouco de alegria para nossas crianças. As doações recebidas serão aplicadas integralmente na realização de nossos objetivos sociais, pois sabemos que um país próspero e sem exclusão depende da participação de todos. Solidariedade é amor compartilhado!",
  },
  {
    id: "campanha-pascoa-solidaria-2",
    data: "2021-03-29",
    titulo: "Campanha Páscoa Solidária!",
    texto: "",
  },
  {
    id: "doacao-mesa-brasil-sesc",
    data: "2021-03-24",
    titulo: "Doação Mesa Brasil SESC!",
    texto:
      "O INAV sabe o quanto uma doação pode fazer a diferença na vida das crianças. Gostaríamos de agradecer imensamente ao Mesa Brasil SESC pelas marmitas de galinhada que foram doadas para as famílias das crianças assistidas. Ficamos imensamente agradecidos pela iniciativa que neste momento é muito importante. Solidariedade é amor compartilhado!",
  },
  {
    id: "doacao-de-livros-da-escritora-maria-liz-da-cunha-oliveira",
    data: "2020-11-27",
    titulo: "Doação de Livros da Escritora: Maria Liz da Cunha Oliveira!",
    texto:
      "O INAV agradece imensamente a doação dos livros da escritora Maria Liz Cunha de Oliveira. Segundo a autora, no livro “Vovó sabe tudo sobre: Asma” a ideia principal é valorizar a figura do idoso e transmitir o conhecimento sobre doenças para a criança. A obra é a primeira de uma série que a autora publicará ao longo dos próximos anos abordando temas de saúde para crianças.",
  },
  {
    id: "festival-gastronomico-mesa-brasil",
    data: "2020-10-17",
    titulo: "Festival Gastronômico Mesa Brasil!",
    texto:
      "O Festival Gastronômico Mesa Brasil, promoveu apresentação de pratos saudáveis com reaproveitamento integral dos alimentos. Foram 54 entidades inscritas e o Instituto Nair Valadares – INAV, conquistou o terceiro lugar, representado por nossa nutricionista Rosemary Ribeiro Freitas, a única profissional de nutrição que concorreu com cozinheiros (as).",
  },
  {
    id: "homenagem-de-algumas-criancas-ao-dia-dos-professores",
    data: "2020-10-16",
    titulo: "Homenagem de Algumas Crianças ao dia dos Professores!",
    texto: "",
  },
  {
    id: "campanha-de-prevencao-contra-o-cancer-de-mama",
    data: "2020-10-08",
    titulo: "Campanha de Prevenção Contra o Câncer de Mama!",
    texto:
      "O INAV mais uma vez agradece a parceria com o Instituto Sabin que doou cortesias de exames de mamografias para as colaboradoras do INAV.",
  },
  {
    id: "projeto-frutos-de-solidariedade",
    data: "2020-06-26",
    titulo: "Projeto Frutos de Solidariedade!",
    texto:
      "Durante o 1⁰ Semestre de 2020 o INAV, com o apoio de seus parceiros, realizou diversas doações para as famílias. Que mais frutos de solidariedade possam ser colhidos no próximo semestre! Junte-se a nós ! Como ajudar !",
  },
  {
    id: "2a-campanha-doacao-cestas-basicas-do-banco-de-alimentos",
    data: "2020-06-23",
    titulo: "2ª CAMPANHA DOAÇÃO CESTAS BÁSICAS DO BANCO DE ALIMENTOS!",
    texto:
      "O INAV agradece ao Banco de Alimentos- CEASA por contribuir, mais uma vez, com a doação de cestas para as famílias atendidas na Instituição.",
  },
  {
    id: "sanitizacao-do-inav",
    data: "2020-06-23",
    titulo: "SANITIZAÇÃO DO INAV!",
    texto:
      "Visando a saúde das crianças atendidas e dos funcionários, o INAV mesmo antes do retorno das aulas presenciais já iniciou os cuidados necessários para evitar a contaminação pelo coronavírus. Entre outros cuidados, está fazendo, semanalmente, a sanitização de todos os locais da instituição com produtos apropriados indicados pelo Ministério da Saúde e pela Agência Nacional de Vigilância Sanitária (ANVISA) para desinfecção das superfícies, uma vez que os funcionários continuam exercendo as suas funções e precisam ir à instituição.",
  },
  {
    id: "campanha-doacao-cestas-basicas-do-banco-de-alimentos",
    data: "2020-05-28",
    titulo: "CAMPANHA DOAÇÃO CESTAS BÁSICAS DO BANCO DE ALIMENTOS!",
    texto:
      "O INAV sabe o quanto uma doação pode fazer a diferença na vida das crianças e seus familiares. Gostaríamos de agradecer a cestas verdes doadas pelo Banco de Alimentos (Ceasa). Expressamos nossa gratidão por abraçar conosco essa causa. Gesto de grandeza como este é que nos dá força e ânimo para continuar o atendimento prestado. Solidariedade é amor compartilhado!",
  },
  {
    id: "entrega-cartao-alimentacao",
    data: "2020-05-21",
    titulo: "ENTREGA CARTÃO ALIMENTAÇÃO!",
    texto:
      "Entrega do Cartão Alimentação * Somente para os pais e responsáveis que ainda não receberam Data: 25/05 Horário: 09h00 às 12h00/ 14h00 às 17h00 Local: Regional de Ensino Endereço : SPMS EPIA lote 4 Em frente a Candangolândia (antiga concessionária Peugeot) Documentação: Certidão de nascimento da criança e RG e CPF do Responsável.",
  },
  {
    id: "campanha-de-doacao-de-cesta-basica",
    data: "2020-05-19",
    titulo: "CAMPANHA DE DOAÇÃO DE CESTA BÁSICA!",
    texto:
      "O INAV sabe o quanto uma doação pode fazer a diferença na vida das crianças. Gostaríamos de agradecer imensamente ao Instituto Sabin pelas trinta cestas básicas e trinta kits que foram doados para nossas crianças. Solidariedade é amor compartilhado!",
  },
  {
    id: "campanha-de-arrecadacao-para-o-enfrentamento-ao-novo-coronavirus-3",
    data: "2020-05-06",
    titulo: "CAMPANHA DE ARRECADAÇÃO PARA O ENFRENTAMENTO AO NOVO CORONAVÍRUS!",
    texto:
      "A ação da entrega das 90 (noventa) cestas básicas doadas ao INAV pela GPS FOUNDATION por meio da CAMPANHA DE ARRECADAÇÃO PARA O ENFRENTAMENTO AO NOVO CORONAVÍRUS foi realizada na sede da instituição, no Riacho Fundo II. A distribuição das cestas aos beneficiários ocorreu no dia 24 de abril de 2020, das 09:00h às 12:00h. Foram distribuídas 90 (noventa) cestas básicas para as famílias das crianças atendidas, porém mais de 300 pessoas foram impactadas com essa ação. Na entrega das doações foram observadas as orientações da Organização Mundial da Saúde – OMS: – Com o intuito de evitar aglomerações a entrega aconteceu com hora marcada; – Tanto a equipe da instituição quanto os beneficiários utilizaram máscaras; – Disponibilizou-se álcool em gel no local de entrega; – Manteve-se o distanciamento recomendado entre as pessoas (mínimo 2 metros). O INAV sabe o quanto uma doação pode fazer a diferença na vida das crianças e seus familiares. Gostaríamos de agradecer imensamente a gentil contribuição. Quem é solidário, viraliza amor! Juntos vamos fazer a nossa parte!",
  },
  {
    id: "entrega-do-cartao-bolsa-alimentacao",
    data: "2020-03-25",
    titulo: "Entrega do Cartão Bolsa Alimentação!",
    texto:
      "Para o recebimento do Cartão Alimentação Creche – CAC , o responsável legal da criança, matriculada na creche, deverá comparecer no dia, horário e local indicados no cronograma de atendimento, de acordo com a creche em que a criança está matriculada . Para a retirada é obrigatório a apresentação de documento de identificação com foto, certidão de nascimento da criança e/ou Termo de Guarda , se for o caso.",
  },
  {
    id: "circular-funcionamento-creches",
    data: "2020-03-18",
    titulo: "Circular Nº 25/2020 – SEE/SUPLAV!",
    texto: "CIRCULAR 25 – FUNCIONAMENTO CRECHES – SEI_00080_00056425_2020_37 (1)",
  },
  {
    id: "decisao-judicial",
    data: "2020-03-18",
    titulo: "Decisão Judicial!",
    texto: "Decisão Judicial",
  },
  {
    id: "comunicado",
    data: "2020-03-16",
    titulo: "Comunicado!",
    texto: "",
  },
  {
    id: "informativo",
    data: "2020-03-15",
    titulo: "Informativo!",
    texto: "",
  },
  {
    id: "festa-de-natal",
    data: "2020-01-17",
    titulo: "Festa de Natal!",
    texto:
      "No dia 13 de dezembro comemoramos o Natal do INAV, com uma deliciosa ceia natalina e entrega dos presentes para as crianças, doados pelo Instituto SABIN e pela Campanha do Papai Noel dos Correios.",
  },
];
