import ProjectDetailsInfo from "./ProjectDetailsInfo";
import ProjectDetailsSlider from "./ProjectDetailsSlider";

const ProjectDetailsModal = ({ darkTheme = false, projectDetails }) => {
  if (!projectDetails) return null;
  return (
    <>
      <div
        className="modal fade bg-dark-1"
        id="exampleModal"
        tabIndex={projectDetails.id}
        // aria-labelledby="exampleModalLabel"
        // aria-hidden="true"
      >
        <div className="modal-dialog modal-xl">
          <div
            className={
              "modal-content " + (darkTheme ? "bg-dark-2 text-light" : "")
            }
          >
            <div className="modal-body">
              <button
                type="button"
                className={"btn-close " + (darkTheme ? "btn-close-white" : "")}
                data-bs-dismiss="modal"
                aria-label="Close"
              />
              <div
                className={
                  "container ajax-container " +
                  (darkTheme ? "bg-dark-2 text-light" : "")
                }
              >
                <h3
                  className={
                    "text-6 font-weight-600 text-center mb-4" +
                    (darkTheme ? " text-white" : "")
                  }
                >
                  {projectDetails?.title}
                </h3>
                <div className="column g-4">
                  <ProjectDetailsSlider
                    darkTheme={darkTheme}
                    projectDetails={projectDetails}
                  />
                  <ProjectDetailsInfo
                    darkTheme={darkTheme}
                    projectDetails={projectDetails}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetailsModal;
