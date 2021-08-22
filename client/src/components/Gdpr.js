import React from 'react';

const Gdpr = () => {
  let ainejarj_lyh = 'syrinx';
  let ainejarj = 'Syrinx ry';
  let yhteyshenk = 'Anette Ursin, anette.a.k.ursin@student.jyu.fi';

  return ( 
    <div className="container">
      <p>Tämä on <span className="ainejarjesto"></span>:n fuksipassin (fuksipassi.fi/{ainejarj_lyh}) henkilötietolain (10 ja 24 §) ja EU:n yleisen tietosuoja-asetuksen (GDPR) mukainen rekisteri- ja tietosuojaseloste. Laadittu 23.8.2020. Päivitetty 23.8.2020.</p>
      
      <p>1. Rekisterinpitäjä</p>
      <p className="sisennys">fuksipassi.fi / y-tunnus: 2923455-6, Vesangantie 2 I 20, 40700 Jyväskylä</p>
      
      <p className="sisennys">Sähköposti: ville.otto@gmail.com</p>
      
      <p>2. Rekisteristä vastaava yhteyshenkilö</p>
      <p className="sisennys">Fuksipassi.fi:n puolesta:</p>
      <p className="sisennys">Otto Virtanen, nolla5nolla5530419, ville.otto@gmail.com</p>
      
      <p className="sisennys">{ainejarj}:n puolesta:</p>
      <p className="sisennys">{yhteyshenk}</p>
      
      
      <p>3. Rekisterin nimi</p>
      <p className="sisennys">Yhdistyksen fuksipassin käyttäjärekisteri</p>
      
      <p>4. Oikeusperuste ja henkilötietojen käsittelyn tarkoitus</p>
      <p className="sisennys">EU:n yleisen tietosuoja-asetuksen mukainen oikeusperuste henkilötietojen käsittelylle on rekisterinpitäjille oikeutettu etu.</p>
      
      <p className="sisennys">Henkilötietojen käsittelyn tarkoitus on fuksipassin toiminnan mahdollistaminen.</p>
      
      <p className="sisennys">Tietoja ei käytetä automatisoituun päätöksentekoon tai profilointiin.</p>
      
      
      <p>5. Rekisterin tietosisältö</p>
      <p className="sisennys">Rekisteriin tallennettavia tietoja ovat: henkilön sähköposti, nimi (sähköpostista) ja fuksipassin suoritushistoria.</p>
      
      <p className="sisennys">Tietoja säilytetään fuksipassin käyttöajan tai korkeintaan fuksivuoden 2020-2021 ajan.</p>
      
      
      <p>6. Säännönmukaiset tietolähteet</p>
      <p className="sisennys">Rekisteriin tallennettavat tiedot saadaan käyttäjältä www-lomakkeella ensimmäisen palveluunkirjautumisen yhteydessä sekä www-lomakkeella käyttäjän suorittaessa tehtäviä.</p>
      
      
      <p>7. Tietojen säännönmukaiset luovutukset ja tietojen siirto EU:n tai ETA:n ulkopuolelle</p>
      <p className="sisennys">Tietoja ei luovuteta muille tahoille.</p>
      
      
      <p>8. Rekisterin suojauksen periaatteet</p>
      <p className="sisennys">Rekisterin käsittelyssä noudatetaan huolellisuutta ja tietojärjestelmien avulla käsiteltävät tiedot suojataan asianmukaisesti. Kun rekisteritietoja säilytetään Internet-palvelimilla, niiden laitteiston fyysisestä ja digitaalisesta tietoturvasta huolehditaan asiaankuuluvasti. Rekisterinpitäjä huolehtii siitä, että tallennettuja tietoja sekä palvelimien käyttöoikeuksia ja muita henkilötietojen turvallisuuden kannalta kriittisiä tietoja käsitellään luottamuksellisesti ja vain rekisterinpitäjien sekä ainejärjestön hallituksen toimesta.</p>
      
      
      <p>9. Tarkastusoikeus ja oikeus vaatia tiedon korjaamista</p>
      <p className="sisennys">Jokaisella rekisterissä olevalla henkilöllä on oikeus tarkistaa rekisteriin tallennetut tietonsa ja vaatia mahdollisen virheellisen tiedon korjaamista tai puutteellisen tiedon täydentämistä. Mikäli henkilö haluaa tarkistaa hänestä tallennetut tiedot tai vaatia niihin oikaisua, pyyntö tulee lähettää sähköisesti rekisterinpitäjälle. Rekisterinpitäjä voi pyytää tarvittaessa pyynnön esittäjää todistamaan henkilöllisyytensä. Rekisterinpitäjä vastaa asiakkaalle EU:n tietosuoja-asetuksessa säädetyssä ajassa (pääsääntöisesti kuukauden kuluessa).</p>
      
      
      <p>10. Muut henkilötietojen käsittelyyn liittyvät oikeudet</p>
      <p className="sisennys">Rekisterissä olevalla henkilöllä on oikeus pyytää häntä koskevien henkilötietojen poistamiseen rekisteristä ("oikeus tulla unohdetuksi"). Niin ikään rekisteröidyillä on muut EU:n yleisen tietosuoja-asetuksen mukaiset oikeudet kuten henkilötietojen käsittelyn rajoittaminen tietyissä tilanteissa. Pyynnöt tulee lähettää sähköisesti rekisterinpitäjälle. Rekisterinpitäjä voi pyytää tarvittaessa pyynnön esittäjää todistamaan henkilöllisyytensä. Rekisterinpitäjä vastaa asiakkaalle EU:n tietosuoja-asetuksessa säädetyssä ajassa (pääsääntöisesti kuukauden kuluessa).</p>
      
      
      <br/>
      <br/>

      <p>Register and data protection description</p>
      
      <p>This is a register and data protection description, which has been made according to <span className="ainejarjesto"></span> personal data act (10 ja 24 §) and EU’s data privacy law (GDPR). Made on 23.8.2020. Last change has been made on 23.8.2020.</p>
      
      <p>1. Register is owned by</p>
      <p className="sisennys">fuksipassi.fi / company ID: 2923455-6, Vesangantie 2 I 20, 40700 Jyväskylä</p>
      
      <p className="sisennys">Email: ville.otto@gmail.com</p>
      
      <p>2. Person in charge of the register</p>
      <p className="sisennys">Via fuksipassi.fi:</p>
      <p className="sisennys">Otto Virtanen, 0505530419, ville.otto@gmail.com</p>
      
      <p className="sisennys">Via {ainejarj}:</p>
      <p className="sisennys">{yhteyshenk}</p>
      
      <p>3. Name of the register</p>
      <p className="sisennys">The register of the users of the fuksipassi (freshman pass) of the association</p>
      
      
      <p>4. Legal bases and the purpose of handling of personal information</p>
      <p className="sisennys">Register holder has a legal right to handle personal information according to the EU’s data privacy law (GDPR). The purpose of handling personal information is to enable function of the fuksipassi (freshman pass). This information is not used for automatic decision-making or profiling.</p>
      
      
      <p>5. Data content of the register</p>
      <p className="sisennys">Information saved in the register: E-mail, name (from the e-mail) and the accomplishment history of the user.</p>
      
      <p className="sisennys">Personal data is deleted after the autumn semester, at the latest at the end of spring semester 2021.</p>
      
      
      <p>6. Source of information according to GDPR</p>
      <p className="sisennys">The information in the register is provided by a www-form by the user when signing in to the service for the first time and by a www-form when accoplishing tasks.</p>
      
      <p>7. Releasing the information outside of EU- or ETA-countries according to GDPR</p>
      <p className="sisennys">Information is not released out to third parties.</p>
      
      <p>8. Principles of protecting the register</p>
      <p className="sisennys">The register is handled with care and the information handled with information technology are protected accordingly. If the register-information is kept on Internet-servers, protection of the devices in which the information is held are protected accordingly. The owner of the register is responsible for making sure that the saved information or the access rights to the servers and other information relevant to the safety of personal information are handled confidentially and only by the owners of the register.</p>
      
      
      <p>9. The right the revise and demand correction of personal data</p>
      <p className="sisennys">Every member whose information is on the register has a right to revise ones information saved in the register and demand a correction of possible wrongful or defective information. The request to do so must be send via e-mail to the owner of the register. The owner of the register has the right to demand verification of identity if needed. The owner of the register must reply in standard time prescribed by the EU’s data privacy law (mainly</p>
      <p className="sisennys">within a month).</p>
      
      <p>10. Other rights conserning the handling of personal data</p>
      <p className="sisennys">Everyone in the register has a legal right to request the deletion of ones personal data from the register (”the right to be forgotten”). Therefore a registered member has also other legal rights prescribed by the the EU’s data privacy law , f.i. the right to restrain the usage of personal information in certain situations. Requests must be send to the owner of the register via e-mail. The owner of the register has a right to demand verification of identity if needed. The owner of the register must reply in standard time prescribed by the EU’s data privacy law (mainly within a month)</p>

      <p>7. Releasing the information outside of EU- or ETA-countries according to GDPR</p>
      <p className="sisennys">Information is not released out to third parties.</p>

      <p>8. Principles of protecting the register</p>
      <p className="sisennys">The register is handled with care and the information handled with information technology are protected accordingly. If the register-information is kept on Internet-servers, protection of the devices in which the information is held are protected accordingly. The owner of the register is responsible for making sure that the saved information or the access rights to the servers and other information relevant to the safety of personal information are handled confidentially and only by the owners of the register.</p>


      <p>9. The right the revise and demand correction of personal data</p>
      <p className="sisennys">Every member whose information is on the register has a right to revise ones information saved in the register and demand a correction of possible wrongful or defective information. The request to do so must be send via e-mail to the owner of the register. The owner of the register has the right to demand verification of identity if needed. The owner of the register must reply in standard time prescribed by the EU’s data privacy law (mainly</p>
      <p className="sisennys">within a month).</p>

      <p>10. Other rights conserning the handling of personal data</p>
      <p className="sisennys">Everyone in the register has a legal right to request the deletion of ones personal data from the register (”the right to be forgotten”). Therefore a registered member has also other legal rights prescribed by the the EU’s data privacy law , f.i. the right to restrain the usage of personal information in certain situations. Requests must be send to the owner of the register via e-mail. The owner of the register has a right to demand verification of identity if needed. The owner of the register must reply in standard time prescribed by the EU’s data privacy law (mainly within a month)</p>

      <p>7. Releasing the information outside of EU- or ETA-countries according to GDPR</p>
      <p className="sisennys">Information is not released out to third parties.</p>

      <p>8. Principles of protecting the register</p>
      <p className="sisennys">The register is handled with care and the information handled with information technology are protected accordingly. If the register-information is kept on Internet-servers, protection of the devices in which the information is held are protected accordingly. The owner of the register is responsible for making sure that the saved information or the access rights to the servers and other information relevant to the safety of personal information are handled confidentially and only by the owners of the register.</p>


      <p>9. The right the revise and demand correction of personal data</p>
      <p className="sisennys">Every member whose information is on the register has a right to revise ones information saved in the register and demand a correction of possible wrongful or defective information. The request to do so must be send via e-mail to the owner of the register. The owner of the register has the right to demand verification of identity if needed. The owner of the register must reply in standard time prescribed by the EU’s data privacy law (mainly within a month).</p>

      <p>10. Other rights conserning the handling of personal data</p>
      <p className="sisennys">Everyone in the register has a legal right to request the deletion of ones personal data from the register (”the right to be forgotten”). Therefore a registered member has also other legal rights prescribed by the the EU’s data privacy law , f.i. the right to restrain the usage of personal information in certain situations. Requests must be send to the owner of the register via e-mail. The owner of the register has a right to demand verification of identity if needed. The owner of the register must reply in standard time prescribed by the EU’s data privacy law (mainly within a month)</p>

    </div>

  )
}

export default Gdpr;