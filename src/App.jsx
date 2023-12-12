import { useFormik } from "formik";
import { useEffect } from "react";
import "./App.scss";

function App() {
  const formik = useFormik({
    initialValues: {
      totalUsers: "",
      usersPerExec: "",
      execRatePerHour: "",
      execRatePerDay: "",
      totalRuns: "",
      runsPerDay: "",
      totalDays: "",
    },
    onSubmit: (values, { setSubmitting }) => {
      const jsonText = JSON.stringify(values, null, 2);
      const newWindow = window.open("", "_blank", "width=600,height=600");
      newWindow.document.write(`<pre>${jsonText}</pre>`);
      setSubmitting(false);
    },
  });
  useEffect(() => {
    const totalRuns = Math.ceil(
      formik.values.totalUsers / formik.values.usersPerExec
    );
    const runsPerDay = Math.ceil(
      formik.values.execRatePerHour * formik.values.execRatePerDay
    );
    const totalDays = Math.ceil(totalRuns / runsPerDay);
    formik.setFieldValue("totalRuns", totalRuns);
    formik.setFieldValue("runsPerDay", runsPerDay);
    formik.setFieldValue("totalDays", totalDays);
  }, [
    formik.values.totalUsers,
    formik.values.usersPerExec,
    formik.values.execRatePerHour,
    formik.values.execRatePerDay,
  ]);

  return (
    <>
      <form id="form" onSubmit={formik.handleSubmit}>
        <label htmlFor="totalUsers">
          Total users (user)
          <input
            id="totalUsers"
            name="totalUsers"
            className="input"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.totalUsers}
          />
        </label>
        <label htmlFor="usersPerExec">
          Users per execution (user/exec)
          <input
            id="usersPerExec"
            name="usersPerExec"
            className="input"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.usersPerExec}
          />
        </label>
        <label htmlFor="execRatePerHour">
          Execution rate per hour (exec/hour)
          <input
            id="execRatePerHour"
            name="execRatePerHour"
            className="input"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.execRatePerHour}
          />
        </label>
        <label htmlFor="execRatePerDay">
          Execution rate per day (exec/day)
          <input
            id="execRatePerDay"
            name="execRatePerDay"
            className="input"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.execRatePerDay}
          />
        </label>
        <div className="results__container">
          <label>
            Total runs (exec)
            <p>
              {isNaN(formik.values.totalRuns) ? "0" : formik.values.totalRuns}
            </p>
          </label>
          <label>
            Runs per day (exec/day)
            <p>
              {isNaN(formik.values.runsPerDay) ? "0" : formik.values.runsPerDay}
            </p>
          </label>
          <label>
            Total days (day)
            <p>
              {isNaN(formik.values.totalDays) ? "0" : formik.values.totalDays}
            </p>
          </label>
        </div>
        <button type="submit">Get in JSON format</button>
      </form>
    </>
  );
}

export default App;
