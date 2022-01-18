import React, {useEffect} from 'react';
import './ProposalStep1.scss';
import { connect } from 'react-redux';
import WithFormField from '../../../../components/WithFormField';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { addProposalFormData } from '../../../../redux/actions';
import { getCategory } from '../../../../services/dashboard';

const ProposalStep1Schema = Yup.object().shape({
  project_name: Yup.string()
    .required('Required'),
  category_id: Yup.string()
    .required('Required'),
  end_time_in_days: Yup.number().required('Required')
});

const ProposalStep1 = (props: any) => {
  const {proposalFormdata, org} = props;

  useEffect(()=>{
    getCategory();
  },[]);

  return (
    <div className="ProposalStep1" data-testid="ProposalStep1">
      <div className="w-100">
        <div className="row mb-4">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <h2 className="fw-bolder">CREATE PROPOSAL</h2>
            <p className="font14 fw-bold color_s">
              Proposals are decisions taken by ORG 3.0 team and are open for vote in a time bound manner by G-Token holders of the Project.
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <Formik
              enableReinitialize={true}
              initialValues={{
                project_name: org?.project && org?.project[0]?.project_name,
                category_id: proposalFormdata?.category_id,
                end_time_in_days: proposalFormdata?.end_time_in_days
              }}
              validationSchema={ProposalStep1Schema}
              onSubmit={async (values) => {
                await new Promise((r) => setTimeout(r, 500));
                props.dispatch(addProposalFormData(values));
                props.nextStep();
              }}
            >
              {({ isValid, values , errors, touched}) => {
                return (
                  <Form>
                    <WithFormField label="Project" name="project_name" error={errors.project_name && touched.project_name} disabled={true} />
                    <WithFormField label="Category" name="category_id" type="select" options={props.category ? props.category : []} error={errors.category_id && touched.category_id}/>
                    <WithFormField label="Time required to complete" name="end_time_in_days" error={errors.end_time_in_days && touched.end_time_in_days} type="number"/>
                    <div className="text-end mb-4">
                      <button className="next_btn" type="submit">NEXT <i className="fa fa-sign-in ps-2" aria-hidden="true"></i></button>
                    </div>
                  </Form>
                )
              }}
            </Formik>
          </div>
        </div>
        <div>
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = (state: any) => {
  return {
    org: state.org,
    category: state.category,
    proposalFormdata: state.proposalFormdata
  };
};

export default connect(mapStateToProps)(ProposalStep1);
