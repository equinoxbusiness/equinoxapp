import React from 'react';
import './ProjectStep3.scss';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { addProjectFormData } from '../../../redux/actions';
import { connect } from "react-redux";
import WithFormField from '../../../components/WithFormField';

const ProjectStep3Schema = Yup.object().shape({
  telegram: Yup.string()
    .required('Required'),
  twitter: Yup.string()
    .required('Required'),
  facebook: Yup.string().required('Required'),
  github: Yup.string().required('Required'),
});

const ProjectStep3 = (props:any) => {
  const { projectFormdata } = props;
  return (
    <div className="ProjectStep3" data-testid="ProjectStep3">
      <div className="container">
        <div className="inner_card ">
          <div className="w-100">
            <div className="row mb-4">
              <div className="col-md-3"></div>
              <div className="col-md-6">
                <p>PROJECT LAUNCHER</p>
                <h2>STEP 3</h2>
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
                    telegram: projectFormdata?.telegram,
                    twitter: projectFormdata?.twitter,
                    facebook: projectFormdata?.facebook,
                    github: projectFormdata?.github
                  }}
                  validationSchema={ProjectStep3Schema}
                  onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 500));
                    props.dispatch(addProjectFormData(values));
                    props.nextStep();
                  }}
                >
                  {({ isValid, errors, touched }) => (
                    <Form>
                      <WithFormField label="Telegram" name="telegram" error={errors.telegram && touched.telegram}/>
                      <WithFormField label="Twitter" name="twitter" error={errors.twitter && touched.twitter}/>
                      <WithFormField label="Facebook" name="facebook" error={errors.facebook && touched.facebook}/>
                      <WithFormField label="Github" name="github" error={errors.github && touched.github}/>
                      <div className="float-start">
                        <button className="next_btn" type="button" onClick={()=>props.previousStep()}>Previuos</button>
                      </div>
                      <div className="float-end">
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

export default connect(mapStateToProps)(ProjectStep3);
