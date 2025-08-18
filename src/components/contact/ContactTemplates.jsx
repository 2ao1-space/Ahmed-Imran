export const ContactTemplates = {
  "new-project": (renderInput) => (
    <p className="text-xl md:text-4xl font-mainHead leading-relaxed text-black dark:text-white">
      Hey Ahmed, my name is {renderInput("name", "[your name]")}. I would like
      to start a new project with you. I'm looking for{" "}
      {renderInput("service", "[type a service]")}. The timing for this project
      is {renderInput("timeframe", "[timeframe]")}. The budget is{" "}
      {renderInput("budget", "[your budget]")}. You can reach me via email at{" "}
      {renderInput("email", "[your email]")}.
    </p>
  ),

  collab: (renderInput) => (
    <p className="text-xl md:text-4xl font-mainHead leading-relaxed text-black dark:text-white">
      What's up Ahmed! I'm {renderInput("name", "[your name]")},{" "}
      {renderInput("timeframe", "[your role]")} here. Got this awesome project
      idea about {renderInput("service", "[the service subject]")} and I think
      you'd be perfect as {renderInput("budget", "[my role]")}. Interested? Hit
      me up at {renderInput("email", "[your email]")}!
    </p>
  ),
};
