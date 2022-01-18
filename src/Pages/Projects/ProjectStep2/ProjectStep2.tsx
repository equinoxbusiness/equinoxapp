import React from 'react';
import './ProjectStep2.scss';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { addProjectFormData } from '../../../redux/actions';
import { connect } from "react-redux";

const ProjectStep2Schema = Yup.object().shape({
  project_description: Yup.string()
    .required('Required')
});

const ProjectStep2 = (props: any) => {
  const {projectFormdata} = props;

  return (
    <div className="ProjectStep2" data-testid="ProjectStep2">
      <div className="container">
        <div className="inner_card ">
          <div className="w-100">
            <div className="row mb-4">
              <div className="col-md-3"></div>
              <div className="col-md-6">
                <p>PROJECT LAUNCHER</p>
                <h2>STEP 2</h2>
                <p className="text-primary">
                  Social Channels
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                      project_description: projectFormdata?.project_description
                    }}
                    validationSchema={ProjectStep2Schema}
                    onSubmit={async (values) => {
                      await new Promise((r) => setTimeout(r, 500));
                      props.dispatch(addProjectFormData(values));
                      props.nextStep();
                    }}
                  >
                    {({ isValid, errors, touched }) => (
                      <Form>
                        <div className="my_input double-line">
                          <div className="text-start">
                            <label>Project's Description (Min 200 Words, Max 500 Words)</label>
                          </div>
                          <Field component="textarea" rows="7" name={"project_description"} className={errors.project_description && touched.project_description ? "invalid": ""}></Field>
                        </div>
                        <div className="float-start">
                          <button className="next_btn" type="button" onClick={()=>props.previousStep()}>Previuos</button>
                        </div>
                        <div className="float-end ">
                          <button className="next_btn" type="submit" disabled={!isValid}>Next</button>
                        </div>
                      </Form>
                    )}
                  </Formik>
              </div>
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = (state: any) => {
  return {
    projectFormdata: state.projectFormdata
  };
};

export default connect(mapStateToProps)(ProjectStep2);
