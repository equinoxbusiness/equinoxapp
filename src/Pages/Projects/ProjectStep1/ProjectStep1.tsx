import React from 'react';
import WithFormField from '../../../components/WithFormField';
import './ProjectStep1.scss';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { addProjectFormData } from '../../../redux/actions';
import { connect } from "react-redux";
import { useEffect } from 'react';
import { getCategory } from '../../../services/dashboard';

const ProjectStep1Schema = Yup.object().shape({
  project_name: Yup.string()
    .required('Required'),
  cat_id: Yup.string()
    .required('Required'),
  project_site: Yup.string().required('Required'),
  project_email: Yup.string().required('Required'),
});

const ProjectStep1: React.FC<any> = (props) => {
  const {projectFormdata} = props;
  useEffect(()=>{
    getCategory();
  },[])
  return (
    <div className="ProjectStep1" data-testid="ProjectStep1">
      <div className="container">
        <div className="inner_card">
          <div className="w-100">
            <div className="row mb-4">
              <div className="col-md-3"></div>
              <div className="col-md-6">
                <p>PROJECT LAUNCHER</p>
                <h2>CREATE PROJECT</h2>
                <p>
                  Projects are Business units with teams, governance token and Management plans. Governance tokens may be listed on Enterprise DEX for public trading or may solely be used for Organizational Governance..
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <Formik
                  enableReinitialize={true}
                  initialValues={{
                    project_name: projectFormdata?.project_name,
                    cat_id: projectFormdata?.cat_id,
                    project_site: projectFormdata?.project_site,
                    project_email: projectFormdata?.project_email
                  }}
                  validationSchema={ProjectStep1Schema}
                  onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 500));
                    props.dispatch(addProjectFormData(values));
                    props.nextStep();
                  }}
                >
                  {({ isValid, values , errors, touched}) => {
                    return (
                      <Form>
                        <WithFormField label="Project Name" name="project_name" error={errors.project_name && touched.project_name}/>
                        <WithFormField label="Category" name="cat_id" type="select" options={props.category ? props.category : []} error={errors.cat_id && touched.cat_id}/>
                        <WithFormField label="Project's Website" name="project_site" error={errors.project_site && touched.project_site}/>
                        <WithFormField label="Project's Email Address" name="project_email" error={errors.project_email && touched.project_email}/>
                        <div className="float-end">
                          <button className="next_btn" type="submit" disabled={!isValid}>Next</button>
                        </div>
                      </Form>
                    )}
                  }
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = (state: any) => {
  return {
    category: state.category,
    projectFormdata: state.projectFormdata
  };
};

export default connect(mapStateToProps)(ProjectStep1);
