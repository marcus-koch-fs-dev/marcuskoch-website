const Impressum = ({ darkTheme }) => {
  return (
    <div id="impressum" className="modal fade" role="dialog" aria-hidden="true">
      <div
        className="modal-dialog modal-lg modal-dialog-centered"
        role="document"
        style={{ maxWidth: "90%" }}
      >
        <div
          className={
            "modal-content " + (darkTheme ? "bg-dark-2 text-light" : "")
          }
        >
          <div className="modal-header">
            <h1 className={"modal-title " + (darkTheme ? "text-white" : "")}>
              Impressum
            </h1>
            <button
              type="button"
              className={"btn-close " + (darkTheme ? "btn-close-white" : "")}
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body p-4">
            <p>Marcus Koch Im Priel 1 88138 Sigmarszell Deutschland</p>
            <p>Tel.: +491723439655 E-Mail: marcus@marcus-koch.dev</p>
            <p>
              Plattform der EU-Kommission zur Online-Streitbeilegung:{" "}
              <a href="https://ec.europa.eu/odr" target="_blank">
                https://ec.europa.eu/odr
              </a>
            </p>
            <p>
              Wir sind zur Teilnahme an einem Streitbeilegungsverfahren vor
              einer Verbraucherschlichtungsstelle weder verpflichtet noch
              bereit.
            </p>
            <ul className="lh-lg">
              <li>
                <p>Urheberrechtshinweis:</p>
                <p>
                  Alle Inhalte und Werke auf dieser Webseite, einschließlich
                  Texte, Bilder, Grafiken, Videos und Animationsdateien,
                  unterliegen dem deutschen Urheberrecht und anderen Gesetzen
                  zum Schutz geistigen Eigentums. Die Vervielfältigung,
                  Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb
                  der Grenzen des Urheberrechtes bedürfen der vorherigen
                  schriftlichen Zustimmung des jeweiligen Autors bzw.
                  Erstellers. Downloads und Kopien dieser Seite sind nur für den
                  privaten, nicht kommerziellen Gebrauch gestattet. Soweit die
                  Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden,
                  werden die Urheberrechte Dritter beachtet. Insbesondere werden
                  Inhalte Dritter als solche gekennzeichnet. Sollten Sie auf
                  eine Urheberrechtsverletzung aufmerksam werden, bitten wir um
                  einen entsprechenden Hinweis. Bei Bekanntwerden von
                  Rechtsverletzungen werden wir derartige Inhalte umgehend
                  entfernen.
                </p>
              </li>
              <li>
                <p>Markenzeichen:</p>
                <p>
                  Sofern nicht anders angegeben, sind alle Markenzeichen auf
                  dieser Webseite markenrechtlich geschützt. Dies gilt
                  insbesondere für Firmenlogos und -zeichen.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Impressum;
