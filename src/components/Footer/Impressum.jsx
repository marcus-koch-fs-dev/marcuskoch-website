const Impressum = ({ darkTheme }) => {
  return (
    <div id="impressum" className="modal fade" role="dialog" aria-hidden="true">
      <div
        className="modal-dialog modal-lg modal-dialog-centered"
        role="document"
      >
        <div
          className={
            "modal-content " + (darkTheme ? "bg-dark-2 text-light" : "")
          }
        >
          <div className="modal-header">
            <h5 className={"modal-title " + (darkTheme ? "text-white" : "")}>
              Copyright &amp; Impressum
            </h5>
            <button
              type="button"
              className={"btn-close " + (darkTheme ? "btn-close-white" : "")}
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body p-4">
            <p>
              Marcus Koch Im Priel 1 88138 Sigmarszell Deutschland Tel.:
              +491723439655 E-Mail: marcus@marcus-koch.dev Plattform der
              EU-Kommission zur Online-Streitbeilegung: https://ec.europa.eu/odr
              Wir sind zur Teilnahme an einem Streitbeilegungsverfahren vor
              einer Verbraucherschlichtungsstelle weder verpflichtet noch
              bereit. Urheberrechtshinweis: Alle Inhalte und Werke auf dieser
              Webseite, einschließlich Texte, Bilder, Grafiken, Videos und
              Animationsdateien, unterliegen dem deutschen Urheberrecht und
              anderen Gesetzen zum Schutz geistigen Eigentums. Die
              Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
              Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
              vorherigen schriftlichen Zustimmung des jeweiligen Autors bzw.
              Erstellers. Downloads und Kopien dieser Seite sind nur für den
              privaten, nicht kommerziellen Gebrauch gestattet. Soweit die
              Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden,
              werden die Urheberrechte Dritter beachtet. Insbesondere werden
              Inhalte Dritter als solche gekennzeichnet. Sollten Sie auf eine
              Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
              entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen
              werden wir derartige Inhalte umgehend entfernen. Die Erstellung,
              Verbreitung und Verwendung von Kopien der Inhalte in
              elektronischen oder gedruckten Publikationen ist ohne
              ausdrückliche Zustimmung nicht gestattet. Dies gilt insbesondere
              für die kommerzielle Verwendung der Inhalte. Markenzeichen: Sofern
              nicht anders angegeben, sind alle Markenzeichen auf dieser
              Webseite markenrechtlich geschützt. Dies gilt insbesondere für
              Firmenlogos und -zeichen.
            </p>
            <ul className="lh-lg">
              <li>
                Lisque persius interesset his et, in quot quidam persequeris
                vim, ad mea essent possim iriure.
              </li>
              <li>
                Quidam lisque persius interesset his et, Lisque persius
                interesset his et, in quot quidam persequeris vim, ad mea essent
                possim iriure.
              </li>
              <li>
                In quot quidam persequeris vim, ad mea essent possim iriure.
                Quidam lisque persius interesset his et.
              </li>
              <li>
                Quidam lisque persius interesset his et, Lisque persius
                interesset his et.
              </li>
              <li>
                Interesset his et, Lisque persius interesset his et, in quot
                quidam persequeris vim, ad mea essent possim iriure.
              </li>
              <li>
                Persius interesset his et, Lisque persius interesset his et, in
                quot quidam persequeris vim, ad mea essent possim iriure.
              </li>
              <li>
                Quot quidam persequeris vim Quidam lisque persius interesset his
                et, Lisque persius interesset his et, in quot quidam persequeris
                vim, ad mea essent possim iriure.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Impressum;
