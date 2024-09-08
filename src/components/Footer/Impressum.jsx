import "./impressum.scss";

const Impressum = () => {
  return (
    <article className="impressum">
      <div>
        <h1>Impressum</h1>
      </div>
      <div className="">
        <p>Marcus Koch Im Priel 1 88138 Sigmarszell Deutschland</p>
        <p>Tel.: +491723439655 E-Mail: marcus@marcus-koch.dev</p>
        <p>
          Plattform der EU-Kommission zur Online-Streitbeilegung:{" "}
          <a href="https://ec.europa.eu/odr" target="_blank">
            https://ec.europa.eu/odr
          </a>
        </p>
        <p>
          Wir sind zur Teilnahme an einem Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle weder verpflichtet noch bereit.
        </p>
        <ul className="urheber">
          <li>
            <p>Urheberrechtshinweis:</p>
            <p>
              Alle Inhalte und Werke auf dieser Webseite, einschließlich Texte,
              Bilder, Grafiken, Videos und Animationsdateien, unterliegen dem
              deutschen Urheberrecht und anderen Gesetzen zum Schutz geistigen
              Eigentums. Die Vervielfältigung, Bearbeitung, Verbreitung und jede
              Art der Verwertung außerhalb der Grenzen des Urheberrechtes
              bedürfen der vorherigen schriftlichen Zustimmung des jeweiligen
              Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur
              für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit
              die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden,
              werden die Urheberrechte Dritter beachtet. Insbesondere werden
              Inhalte Dritter als solche gekennzeichnet. Sollten Sie auf eine
              Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
              entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen
              werden wir derartige Inhalte umgehend entfernen.
            </p>
          </li>
          <li>
            <p>Markenzeichen:</p>
            <p>
              Sofern nicht anders angegeben, sind alle Markenzeichen auf dieser
              Webseite markenrechtlich geschützt. Dies gilt insbesondere für
              Firmenlogos und -zeichen.
            </p>
          </li>
        </ul>
      </div>
    </article>
  );
};

export default Impressum;
