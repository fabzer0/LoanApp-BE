module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert("Banks", [
      {
        country: "Benin",
        banks: [
          "FEMA BANK",
          "FEMA BANK BENIN",
          "African Investment Bank",
          "International Commercial Bank I.C.B",
          "Benin Regional Solidarity Bank",
          "Banque Atlantique Bénin",
          "Bank of Africa Bénin",
          "BGFIBank Group",
          "Banque de I'Habitat du Bénin",
          "Banque Internationale du Bénin",
          "Banque Sahélo-Saharienne pour I'Investissement et le Commerce (BSSIC)",
          "Continental Bank Bénin",
          "GM Clearing House EU",
          "Caissie Primes",
          "MSF BANK",
          "MSF Bank Benin",
          "King Bank Pic Bénin",
          "Diamond Bank Bénin",
          "Ecobank Bénin",
          "Industrial Bank of Benin, West Africa",
          "Livex International Bank Bénin",
          "O.P.C",
          "United Benin Bank",
          "Allied Benin Financial Institution",
          "Ulti Bank Pic Bénin",
          "Financial Bank Bénin",
          "Societe Generale de Banques au Bénin",
          "United Bank of Africa",
          "ICASH POWER Financial & Mortgage bank",
          "Central Bank of West African States",
          "Banque Capitale du Benin"
        ],
        createdAt: "2019-12-21T17:25:40.103Z",
        updatedAt: "2019-12-21T17:25:40.103Z"
      },
      {
        country: "Togo",
        banks: [
          "Financial Bank Togo",
          "Banque Sahélo-Saharienne pour I'Investissement et le Commerce",
          "Banque Atlantique Togo",
          "Banque Régionale de Solidarite",
          "Banque Togilaise pour le Commerce et I'Industrie",
          "Banque Internationale pour I'Afrique au Togo",
          "Ecobank Togo",
          "Société Inter-Africaine de Banque",
          "Union Togolaise de Banque",
          "Banque Togolaise de Développement"
        ],
        createdAt: "2019-12-21T17:25:40.103Z",
        updatedAt: "2019-12-21T17:25:40.103Z"
      },
      {
        country: "Cote D'Ivoire",
        banks: [
          "Afriland First Bank Ivory Coast",
          "Bridge Bank Group - Côte d'Ivoire",
          "Banque Atlantique Côte d'Ivoire (BACI)",
          "Banque Internationale pour le Commerce et I'Industrie de la Côte d'Ivoire (BICICI)",
          "Bank of Africa - Côte d'Ivoire",
          "Banque Régionale de Solidarité - Côte d'Ivoire",
          "Banque pour le Financement de I'Agriculture",
          "Societe Generale de Banques en Côte d'Ivoire",
          "Export-Import Bank of Korea Côte d'Ivoire",
          "Standard Chartered Bank Côte d'Ivoire",
          "Stanbic Bank Côte d'Ivoire",
          "COFIPA Investment Bank - Côte d'Ivoire",
          "Banque de I'Habitat de Côte d'Ivoire",
          "Société Ivoirienne de Banque",
          "Banque Nationale d'Investissement",
          "Compagnie Bancaire de I'Atlantique-Côte d'Ivoire",
          "Ecobank Côte d'Ivoire",
          "Omnifinance Bank",
          "Versus Banque S.A.",
          "Banque Internationale pour I'Afrique Occidentale"
        ],
        createdAt: "2019-12-21T17:25:40.103Z",
        updatedAt: "2019-12-21T17:25:40.103Z"
      }
    ]),

  down: queryInterface => queryInterface.bulkDelete("Banks")
};
